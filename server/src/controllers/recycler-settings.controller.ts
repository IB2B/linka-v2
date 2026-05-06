import type { Response, NextFunction } from "express";
import { z } from "zod";
import type { AuthRequest } from "../middleware/auth";
import * as settings from "../models/recycle-settings.model";

const schema = z.object({
  enabled: z.boolean(),
  perWeek: z.number().int().min(1).max(7),
  minAgeDays: z.number().int().min(7).max(365),
});

export async function getRecyclerSettings(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    res.json({ settings: await settings.getSettings(req.user!.id) });
  } catch (e) { next(e); }
}

export async function updateRecyclerSettings(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.issues[0].message }); return;
    }
    await settings.upsertSettings(req.user!.id, parsed.data);
    res.json({ settings: await settings.getSettings(req.user!.id) });
  } catch (e) { next(e); }
}
