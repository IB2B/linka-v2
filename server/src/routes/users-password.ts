import type { Response } from "express";
import { z } from "zod";
import { db } from "../lib/db";
import { hashPassword, comparePassword } from "../lib/password";
import type { AuthRequest } from "../middleware/auth";

const schema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8),
});

export async function changePassword(req: AuthRequest, res: Response): Promise<void> {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.issues[0].message }); return; }

  const [rows] = await db.query<any[]>("SELECT password_hash FROM users WHERE id = ?", [req.user!.id]);
  if (!rows[0] || !(await comparePassword(parsed.data.currentPassword, rows[0].password_hash))) {
    res.status(401).json({ error: "Current password is incorrect." }); return;
  }
  await db.query(
    "UPDATE users SET password_hash = ? WHERE id = ?",
    [await hashPassword(parsed.data.newPassword), req.user!.id],
  );
  res.json({ ok: true });
}
