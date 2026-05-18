import { Router } from "express";
import { z } from "zod";
import { createResetToken, findUserByEmail, redeemResetToken } from "../lib/password-reset";
import { sendEmail } from "../lib/email/send";
import { passwordResetEmail } from "../lib/email/templates/password-reset";
import { rateLimitMw } from "../middleware/rate-limit-mw";

const router = Router();

const forgotIpLimit = rateLimitMw("forgot-ip", 5, 60 * 60 * 1000);
const forgotEmailLimit = rateLimitMw(
  "forgot-email", 3, 60 * 60 * 1000,
  (req) => String(req.body?.email ?? "").toLowerCase(),
);
const resetIpLimit = rateLimitMw("reset-ip", 10, 60 * 60 * 1000);

const forgotSchema = z.object({
  email: z.string().email().transform((v) => v.toLowerCase()),
});

const resetSchema = z.object({
  token: z.string().length(64).regex(/^[a-f0-9]+$/i),
  newPassword: z.string().min(8),
});

router.post("/forgot-password", forgotIpLimit, forgotEmailLimit, async (req, res, next) => {
  try {
    const parsed = forgotSchema.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: parsed.error.issues[0].message }); return; }

    const user = await findUserByEmail(parsed.data.email);
    if (user) {
      const token = await createResetToken(user.id);
      const base = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
      const resetUrl = `${base}/reset-password?token=${token}`;
      const tpl = passwordResetEmail({ firstName: user.firstName, resetUrl });
      sendEmail({ to: user.email, subject: tpl.subject, html: tpl.html })
        .catch((e) => console.error("[email/password-reset]", e));
    }
    res.json({ ok: true });
  } catch (e) { next(e); }
});

router.post("/reset-password", resetIpLimit, async (req, res) => {
  const parsed = resetSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0].message });
    return;
  }
  try {
    await redeemResetToken(parsed.data.token, parsed.data.newPassword);
    res.json({ ok: true });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Reset failed.";
    res.status(400).json({ error: msg });
  }
});

export default router;
