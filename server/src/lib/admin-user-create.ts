import { randomUUID } from "node:crypto";
import { z } from "zod";
import type { Response } from "express";
import { db } from "./db";
import { hashPassword } from "./password";
import { recordAdminAction } from "./admin-audit";
import type { AuthRequest } from "../middleware/auth";

const schema = z.object({
  firstName: z.string().trim().min(1),
  lastName: z.string().trim().min(1),
  email: z.string().email().transform((v) => v.toLowerCase()),
  password: z.string().min(8),
  role: z.enum(["USER", "ADMIN"]).default("USER"),
});

export async function createAdminUser(req: AuthRequest, res: Response): Promise<void> {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.issues[0].message }); return; }
  const { firstName, lastName, email, password } = parsed.data;
  const role = parsed.data.role === "ADMIN" && req.user!.role !== "SUPER_ADMIN" ? "USER" : parsed.data.role;
  const [existing] = await db.query<any[]>("SELECT id FROM users WHERE email = ?", [email]);
  if (existing.length) { res.status(400).json({ error: "Email already in use." }); return; }
  const id = randomUUID();
  await db.query(
    `INSERT INTO users (id, email, password_hash, first_name, last_name, role, onboarding_completed)
     VALUES (?, ?, ?, ?, ?, ?, TRUE)`,
    [id, email, await hashPassword(password), firstName, lastName, role],
  );
  await recordAdminAction(req.user!.id, "user.created", id, { role });
  res.json({ id });
}
