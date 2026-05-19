import { Router } from "express";
import { z } from "zod";
import { db } from "../lib/db";
import { authenticate, type AuthRequest } from "../middleware/auth";
import { generateCode, redeemCode, storeCode } from "../lib/email-verification";
import { VerificationError } from "../lib/verification-error";
import { sendEmail } from "../lib/email/send";
import { emailVerificationEmail } from "../lib/email/templates/email-verification";
import { welcomeEmail } from "../lib/email/templates/welcome";
import { rateLimitMw } from "../middleware/rate-limit-mw";

const router = Router();

const verifyLimit = rateLimitMw(
  "verify-email", 20, 15 * 60 * 1000,
  (req) => (req as AuthRequest).user?.id ?? req.ip ?? "anon",
);
const resendLimit = rateLimitMw(
  "resend-verify", 4, 60 * 60 * 1000,
  (req) => (req as AuthRequest).user?.id ?? req.ip ?? "anon",
);

const verifySchema = z.object({ code: z.string().regex(/^\d{6}$/) });

async function sendWelcome(userId: string): Promise<void> {
  try {
    const [[u]] = await db.query<any[]>("SELECT email, first_name FROM users WHERE id = ?", [userId]);
    if (!u) return;
    const tpl = welcomeEmail({ firstName: u.first_name, appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "" });
    await sendEmail({ to: u.email, subject: tpl.subject, html: tpl.html });
  } catch (e) { console.error("[email/welcome]", e); }
}

router.post("/verify-email", authenticate, verifyLimit, async (req: AuthRequest, res, next) => {
  try {
    const parsed = verifySchema.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: "Enter the 6-digit code." }); return; }
    await redeemCode(req.user!.id, parsed.data.code);
    res.json({ ok: true });
    sendWelcome(req.user!.id);
  } catch (e: unknown) {
    if (e instanceof VerificationError) {
      res.status(400).json({ error: e.message }); return;
    }
    next(e);
  }
});

router.post("/resend-verification", authenticate, resendLimit, async (req: AuthRequest, res, next) => {
  try {
    const userId = req.user!.id;
    const [[u]] = await db.query<any[]>(
      "SELECT email, first_name, email_verified_at FROM users WHERE id = ?",
      [userId],
    );
    if (!u) { res.status(404).json({ error: "Account not found." }); return; }
    if (u.email_verified_at) { res.status(400).json({ error: "Email already verified." }); return; }

    const code = generateCode();
    await storeCode(userId, code);
    const tpl = emailVerificationEmail({ firstName: u.first_name, code });
    sendEmail({ to: u.email, subject: tpl.subject, html: tpl.html })
      .catch((e) => console.error("[email/verify-resend]", e));
    res.json({ ok: true });
  } catch (e) { next(e); }
});

export default router;
