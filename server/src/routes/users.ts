import { Router } from "express";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { db } from "../lib/db";
import { authenticate, type AuthRequest } from "../middleware/auth";
import { changePassword } from "./users-password";

const router = Router();
router.use(authenticate);

router.get("/me", async (req: AuthRequest, res, next) => {
  try {
    const [rows] = await db.query<any[]>(
      `SELECT u.id, u.email, u.role, u.first_name, u.last_name,
              p.avatar_url, p.industry, p.bio
       FROM users u LEFT JOIN user_profiles p ON p.user_id = u.id
       WHERE u.id = ?`, [req.user!.id],
    );
    const u = rows[0];
    if (!u) { res.status(404).json({ error: "Not found" }); return; }
    res.json({
      id: u.id, email: u.email, role: u.role,
      firstName: u.first_name, lastName: u.last_name,
      avatarUrl: u.avatar_url ?? null,
      industry: u.industry ?? null,
      bio: u.bio ?? null,
    });
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
