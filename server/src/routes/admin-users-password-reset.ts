import { Router } from "express";
import { db } from "../lib/db";
import { adminOnly, type AuthRequest } from "../middleware/admin";
import { createResetToken } from "../lib/password-reset";
import { sendEmail } from "../lib/email/send";
import { passwordResetEmail } from "../lib/email/templates/password-reset";
import { recordAdminAction } from "../lib/admin-audit";
import { rateLimitMw } from "../middleware/rate-limit-mw";

const router = Router();
router.use(adminOnly);

const perTargetLimit = rateLimitMw(
  "admin-pw-reset", 5, 60 * 60 * 1000,
  (req) => String(req.params.id ?? ""),
);

router.post("/:id/password-reset", perTargetLimit, async (req: AuthRequest, res, next) => {
  try {
    const [[u]] = await db.query<any[]>(
      `SELECT id, email, first_name FROM users
         WHERE id = ? AND deleted_at IS NULL`,
      [req.params.id],
    );
    if (!u) { res.status(404).json({ error: "User not found." }); return; }

    const token = await createResetToken(u.id);
    const base = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    const resetUrl = `${base}/reset-password?token=${token}`;
    const tpl = passwordResetEmail({ firstName: u.first_name, resetUrl });

    sendEmail({ to: u.email, subject: tpl.subject, html: tpl.html })
      .catch((e) => console.error("[email/admin-password-reset]", e));

    await recordAdminAction(
      req.user!.id, "user.password_reset_sent", String(req.params.id),
    );
    res.json({ ok: true });
  } catch (e) { next(e); }
});

export default router;
