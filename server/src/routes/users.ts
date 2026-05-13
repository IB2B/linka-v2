import { Router } from "express";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { db } from "../lib/db";
import { authenticate, type AuthRequest } from "../middleware/auth";
import { getUserMe } from "../lib/user-me-query";
import { changePassword } from "./users-password";
import avatarRouter from "./users-avatar";

const router = Router();
router.use("/me/avatar", avatarRouter);
router.use(authenticate);

router.get("/me", async (req: AuthRequest, res, next) => {
  try {
    const user = await getUserMe(req.user!.id);
    if (!user) { res.status(404).json({ error: "Not found" }); return; }
    res.json(user);
  } catch (e) { next(e); }
});

router.patch("/me", async (req: AuthRequest, res, next) => {
  try {
    const parsed = z.object({
      firstName: z.string().trim().min(1),
      lastName: z.string().trim().min(1),
    }).safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: parsed.error.issues[0].message }); return; }
    await db.query(
      "UPDATE users SET first_name = ?, last_name = ? WHERE id = ?",
      [parsed.data.firstName, parsed.data.lastName, req.user!.id],
    );
    res.json({ ok: true });
  } catch (e) { next(e); }
});

const profileSchema = z.object({
  industry: z.string().trim().optional(),
  bio: z.string().trim().optional(),
});

router.patch("/me/profile", async (req: AuthRequest, res, next) => {
  try {
    const parsed = profileSchema.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: parsed.error.issues[0].message }); return; }
    await db.query(
      `INSERT INTO user_profiles (id, user_id, industry, bio) VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE industry = VALUES(industry), bio = VALUES(bio)`,
      [randomUUID(), req.user!.id, parsed.data.industry ?? null, parsed.data.bio ?? null],
    );
    res.json({ ok: true });
  } catch (e) { next(e); }
});

router.post("/me/password", (req: AuthRequest, res, next) => {
  changePassword(req, res).catch(next);
});

router.delete("/me", async (req: AuthRequest, res, next) => {
  try {
    await db.query("DELETE FROM users WHERE id = ?", [req.user!.id]);
    res.clearCookie("token");
    res.json({ ok: true });
  } catch (e) { next(e); }
});

export default router;
