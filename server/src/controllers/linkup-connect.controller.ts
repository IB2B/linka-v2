import type { Response } from "express";
import { z } from "zod";
import type { AuthRequest } from "../middleware/auth";
import { linkupLogin, linkupVerify } from "../lib/linkup-auth";
import { getLinkupAccount, saveLinkupAccount, deleteLinkupAccount } from "../lib/linkup-account";

const COUNTRY = z.string().trim().toUpperCase().default("US");
const loginSchema = z.object({ email: z.string().email(), password: z.string().min(1), country: COUNTRY });
const verifySchema = z.object({ email: z.string().email(), code: z.string().trim().min(3), country: COUNTRY });

// Turn Linkup's raw API errors into something a person can act on.
function msg(e: unknown): string {
  const raw = (e instanceof Error ? e.message : "").toLowerCase();
  if (/password|username|credential|invalid login/.test(raw))
    return "Incorrect LinkedIn email or password.";
  if (/captcha|challenge|checkpoint/.test(raw))
    return "LinkedIn asked for an extra security check — try again shortly.";
  if (/rate|too many|429/.test(raw))
    return "Too many attempts. Wait a few minutes and try again.";
  return e instanceof Error && e.message ? e.message : "Couldn't connect to LinkedIn.";
}

export async function linkedinStatus(req: AuthRequest, res: Response) {
  const acc = await getLinkupAccount(req.user!.id);
  res.json({ connected: !!acc, email: acc?.email ?? null });
}

export async function startLinkedinLogin(req: AuthRequest, res: Response) {
  const p = loginSchema.safeParse(req.body);
  if (!p.success) { res.status(400).json({ error: "Enter a valid email and password." }); return; }
  try {
    const r = await linkupLogin(p.data.email, p.data.password, p.data.country);
    if (!r.needsVerification && r.loginToken) {
      await saveLinkupAccount(req.user!.id, r.loginToken, p.data.email, p.data.country);
      res.json({ status: "connected" }); return;
    }
    res.json({ status: "verify" });
  } catch (e) { res.status(400).json({ error: msg(e) }); }
}

export async function verifyLinkedinLogin(req: AuthRequest, res: Response) {
  const p = verifySchema.safeParse(req.body);
  if (!p.success) { res.status(400).json({ error: "Enter the verification code." }); return; }
  try {
    const token = await linkupVerify(p.data.email, p.data.code, p.data.country);
    await saveLinkupAccount(req.user!.id, token, p.data.email, p.data.country);
    res.json({ status: "connected" });
  } catch { res.status(400).json({ error: "Verification failed. Check the code and try again." }); }
}

export async function disconnectLinkedin(req: AuthRequest, res: Response) {
  await deleteLinkupAccount(req.user!.id);
  res.json({ ok: true });
}
