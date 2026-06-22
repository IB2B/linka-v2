import { randomUUID } from "node:crypto";
import { z } from "zod";
import { db } from "../lib/db";
import type { AuthRequest } from "../middleware/auth";
import type { Response } from "express";

const schema = z.object({
  industry:       z.string().trim().optional(),
  bio:            z.string().trim().optional(),
  jobTitle:       z.string().trim().optional(),
  contentGoal:    z.string().trim().optional(),
  brandTone:      z.string().trim().optional(),
  targetAudience: z.string().trim().optional(),
  preferredLanguage: z.string().trim().min(2).max(8).optional(),
});

export async function patchProfile(req: AuthRequest, res: Response): Promise<void> {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0].message });
    return;
  }
  const { industry, bio, jobTitle, contentGoal, brandTone, targetAudience, preferredLanguage } = parsed.data;
  await db.query(
    `INSERT INTO user_profiles (id, user_id, industry, bio, job_title, content_goal, brand_tone, target_audience, preferred_language)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE
       industry           = COALESCE(VALUES(industry), industry),
       bio                = COALESCE(VALUES(bio), bio),
       job_title          = COALESCE(VALUES(job_title), job_title),
       content_goal       = COALESCE(VALUES(content_goal), content_goal),
       brand_tone         = COALESCE(VALUES(brand_tone), brand_tone),
       target_audience    = COALESCE(VALUES(target_audience), target_audience),
       preferred_language = COALESCE(VALUES(preferred_language), preferred_language)`,
    [randomUUID(), req.user!.id,
     industry ?? null, bio ?? null, jobTitle ?? null,
     contentGoal ?? null, brandTone ?? null, targetAudience ?? null, preferredLanguage ?? null],
  );
  res.json({ ok: true });
}
