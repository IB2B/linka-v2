import { Router } from "express";
import { randomUUID } from "node:crypto";
import { db } from "../lib/db";
import { hashPassword, comparePassword } from "../lib/password";
import { signToken } from "../lib/jwt";
import { authenticate, type AuthRequest } from "../middleware/auth";
import { sendEmail } from "../lib/email/send";
import { welcomeEmail } from "../lib/email/templates/welcome";
import { COOKIE_OPTS } from "../lib/cookie-opts";
import { rateLimitMw } from "../middleware/rate-limit-mw";
import { registerSchema, loginSchema } from "./auth-schemas";

const router = Router();

const loginIpLimit = rateLimitMw("login-ip", 10, 5 * 60 * 1000);
const loginEmailLimit = rateLimitMw(
  "login-email", 8, 15 * 60 * 1000,
  (req) => String(req.body?.email ?? "").toLowerCase(),
);
const registerIpLimit = rateLimitMw("register-ip", 5, 60 * 60 * 1000);

router.post("/register", registerIpLimit, async (req, res, next) => {
  try {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: parsed.error.issues[0].message }); return; }
    const { firstName, lastName, email, password } = parsed.data;

    const [existing] = await db.query<any[]>("SELECT id FROM users WHERE email = ?", [email]);
    if (existing.length) { res.status(400).json({ error: "Email already in use." }); return; }

    const id = randomUUID();
    const passwordHash = await hashPassword(password);
    await db.query(
      "INSERT INTO users (id, email, password_hash, first_name, last_name) VALUES (?, ?, ?, ?, ?)",
      [id, email, passwordHash, firstName, lastName],
    );
    res.cookie("token", signToken(id, "USER", 0), COOKIE_OPTS);
    res.json({ role: "USER", emailConfirmationRequired: false });
    const tpl = welcomeEmail({ firstName, appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "" });
    sendEmail({ to: email, subject: tpl.subject, html: tpl.html })
      .catch((e) => console.error("[email/welcome]", e));
  } catch (e) { next(e); }
});

router.post("/login", loginIpLimit, loginEmailLimit, async (req, res, next) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: parsed.error.issues[0].message }); return; }
    const { email, password } = parsed.data;

    const [rows] = await db.query<any[]>(
      `SELECT id, password_hash, role, session_version, status
         FROM users WHERE email = ? AND deleted_at IS NULL`, [email],
    );
    const user = rows[0];
    if (!user || !(await comparePassword(password, user.password_hash))) {
      res.status(401).json({ error: "Invalid credentials." }); return;
    }
    if (user.status === "SUSPENDED") {
      res.status(403).json({ error: "Account suspended. Contact support." }); return;
    }
    res.cookie("token", signToken(user.id, user.role, Number(user.session_version ?? 0)), COOKIE_OPTS);
    res.json({ role: user.role });
  } catch (e) { next(e); }
});

router.get("/me", authenticate, (req: AuthRequest, res) => { res.json(req.user); });

export default router;
