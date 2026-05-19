import type { Response } from "express";
import { z } from "zod";
import { db } from "../lib/db";
import { hashPassword, comparePassword } from "../lib/password";
import { signToken } from "../lib/jwt";
import { COOKIE_OPTS } from "../lib/cookie-opts";
import type { AuthRequest } from "../middleware/auth";

const schema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8),
});

interface UserRow {
  password_hash: string;
  role: string;
  session_version: number;
}

export async function changePassword(req: AuthRequest, res: Response): Promise<void> {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.issues[0].message }); return; }

  const [rows] = await db.query<any[]>(
    "SELECT password_hash, role, session_version FROM users WHERE id = ?",
    [req.user!.id],
  );
  const user = rows[0] as UserRow | undefined;
  if (!user || !(await comparePassword(parsed.data.currentPassword, user.password_hash))) {
    res.status(401).json({ error: "Current password is incorrect." }); return;
  }

  const nextSv = user.session_version + 1;
  await db.query(
    "UPDATE users SET password_hash = ?, session_version = ? WHERE id = ?",
    [await hashPassword(parsed.data.newPassword), nextSv, req.user!.id],
  );
  res.cookie("token", signToken(req.user!.id, user.role, nextSv), COOKIE_OPTS);
  res.json({ ok: true });
}
