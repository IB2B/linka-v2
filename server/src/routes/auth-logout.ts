import { Router } from "express";
import { db } from "../lib/db";
import { authenticate, type AuthRequest } from "../middleware/auth";
import { CLEAR_COOKIE_OPTS } from "../lib/cookie-opts";

const router = Router();

router.post("/logout", (_req, res) => {
  res.clearCookie("token", CLEAR_COOKIE_OPTS);
  res.json({ ok: true });
});

router.post("/logout-all", authenticate, async (req: AuthRequest, res, next) => {
  try {
    await db.query(
      "UPDATE users SET session_version = session_version + 1 WHERE id = ?",
      [req.user!.id],
    );
    res.clearCookie("token", CLEAR_COOKIE_OPTS);
    res.json({ ok: true });
  } catch (e) { next(e); }
});

export default router;
