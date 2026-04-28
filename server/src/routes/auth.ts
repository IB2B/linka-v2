import { Router } from "express";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { db } from "../lib/db";
import { hashPassword, comparePassword } from "../lib/password";
import { signToken } from "../lib/jwt";
import { authenticate, type AuthRequest } from "../middleware/auth";

const router = Router();

const COOKIE_OPTS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const registerSchema = z.object({
  firstName: z.string().trim().min(1),
  lastName: z.string().trim().min(1),
  email: z.string().email().transform((v) => v.toLowerCase()),
  password: z.string().min(8),
});

const loginSchema = z.object({
  email: z.string().email().transform((v) => v.toLowerCase()),
  password: z.string().min(1),
});

router.post("/register", async (req, res, next) => {
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
    res.cookie("token", signToken(id, "USER"), COOKIE_OPTS);
    res.json({ role: "USER", emailConfirmationRequired: false });
  } catch (e) { next(e); }
});

router.post("/login", async (req, res, next) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: parsed.error.issues[0].message }); return; }
    const { email, password } = parsed.data;

    const [rows] = await db.query<any[]>(
      "SELECT id, password_hash, role FROM users WHERE email = ?", [email],
    );
    const user = rows[0];
    if (!user || !(await comparePassword(password, user.password_hash))) {
      res.status(401).json({ error: "Invalid credentials." }); return;
    }
    res.cookie("token", signToken(user.id, user.role), COOKIE_OPTS);
    res.json({ role: user.role });
  } catch (e) { next(e); }
});

router.post("/logout", (_req, res) => {
  res.clearCookie("token");
  res.json({ ok: true });
});

router.get("/me", authenticate, (req: AuthRequest, res) => { res.json(req.user); });

export default router;
