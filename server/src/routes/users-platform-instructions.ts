import { z } from "zod";
import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth";
import { listForUser, upsert } from "../models/platform-instructions.model";

const PLATFORMS = ["linkedin", "twitter", "facebook", "instagram", "threads"];

const text = z.string().trim().max(2000).optional();
const schema = z.object({
  whoIAm: text, whatIDo: text, goals: text, interests: text,
  postTypes: text, tone: text, visualStyle: text, extraNotes: text,
  competitorLinks: z.array(z.string().trim().min(1).max(500)).max(5).optional(),
});

export async function listInstructions(req: AuthRequest, res: Response): Promise<void> {
  res.json(await listForUser(req.user!.id));
}

export async function patchInstructions(req: AuthRequest, res: Response): Promise<void> {
  const platform = String(req.params.platform);
  if (!PLATFORMS.includes(platform)) {
    res.status(400).json({ error: "Unknown platform" });
    return;
  }
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0].message });
    return;
  }
  await upsert(req.user!.id, platform, parsed.data);
  res.json({ ok: true });
}
