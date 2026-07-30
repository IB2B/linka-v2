import { Router } from "express";
import { z } from "zod";
import { db } from "../lib/db";
import { authenticate, type AuthRequest } from "../middleware/auth";
import { getUserMe } from "../lib/user-me-query";
import { changePassword } from "./users-password";
import { patchProfile } from "./users-profile";
import avatarRouter from "./users-avatar";
import { softDeleteUser } from "../lib/user-soft-delete";
import { CLEAR_COOKIE_OPTS } from "../lib/cookie-opts";
import { getNotificationPrefs, patchNotificationPrefs } from "./users-notification-prefs";
import { listInstructions, patchInstructions } from "./users-platform-instructions";

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

router.patch("/me/profile", (req: AuthRequest, res, next) => {
  patchProfile(req, res).catch(next);
});

router.patch("/me/onboarding", async (req: AuthRequest, res, next) => {
  try {
    const parsed = z.object({
      step: z.number().int().min(1).optional(),
      completed: z.boolean().optional(),
    }).safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: parsed.error.issues[0].message }); return; }
    const { step, completed } = parsed.data;
    if (step !== undefined)
      await db.query("UPDATE users SET onboarding_step=? WHERE id=?", [step, req.user!.id]);
    if (completed !== undefined)
      await db.query("UPDATE users SET onboarding_completed=? WHERE id=?", [completed, req.user!.id]);
    res.json({ ok: true });
  } catch (e) { next(e); }
});

router.post("/me/password", (req: AuthRequest, res, next) => {
  changePassword(req, res).catch(next);
});

router.get("/me/platform-instructions", (req: AuthRequest, res, next) => {
  listInstructions(req, res).catch(next);
});

router.patch("/me/platform-instructions/:platform", (req: AuthRequest, res, next) => {
  patchInstructions(req, res).catch(next);
});

router.get("/me/notification-prefs", (req: AuthRequest, res, next) => {
  getNotificationPrefs(req, res).catch(next);
});

router.patch("/me/notification-prefs", (req: AuthRequest, res, next) => {
  patchNotificationPrefs(req, res).catch(next);
});

router.delete("/me", async (req: AuthRequest, res, next) => {
  try {
    await softDeleteUser(req.user!.id);
    res.clearCookie("token", CLEAR_COOKIE_OPTS);
    res.json({ ok: true });
  } catch (e) { next(e); }
});

export default router;
