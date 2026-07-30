import { z } from "zod";
import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth";
import { listForUser, upsert } from "../models/platform-instructions.model";
import { GLOBAL_PLATFORM } from "../lib/instructions-merge";

const PLATFORMS = [
  GLOBAL_PLATFORM, "linkedin", "twitter", "facebook", "instagram", "threads",
];

const text = z.string().trim().max(2000).optional();
const hex = z.string().trim().regex(/^#[0-9a-fA-F]{6}$/).optional();
const font = z.string().trim().max(60).optional();
// Constrained to a path this server issued — the value is read straight back
// off disk when stamping images, so a free-form string would be a file read.
const logoUrl = z.string().trim().regex(/^\/uploads\/logos\/[\w.-]+$/).optional();
const brandKit = z.object({
  primary: hex, secondary: hex, accent: hex, background: hex, text: hex,
  headingFont: font, bodyFont: font,
  logoUrl,
  logoOnImages: z.boolean().optional(),
  logoPlacement: z
    .enum(["top_left", "top_right", "bottom_left", "bottom_right"]).optional(),
}).optional();

const schema = z.object({
  whoIAm: text, whatIDo: text, goals: text, interests: text,
  postTypes: text, tone: text, visualStyle: text, extraNotes: text,
  brandKit,
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
