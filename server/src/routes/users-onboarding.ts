import { z } from "zod";
import type { Response } from "express";
import { db } from "../lib/db";
import type { AuthRequest } from "../middleware/auth";

const schema = z.object({
  step: z.number().int().min(1).optional(),
  completed: z.boolean().optional(),
});

export async function patchOnboarding(req: AuthRequest, res: Response): Promise<void> {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.issues[0].message }); return; }
  const { step, completed } = parsed.data;
  if (step !== undefined)
    await db.query("UPDATE users SET onboarding_step=? WHERE id=?", [step, req.user!.id]);
  if (completed !== undefined)
    await db.query("UPDATE users SET onboarding_completed=? WHERE id=?", [completed, req.user!.id]);
  res.json({ ok: true });
}
