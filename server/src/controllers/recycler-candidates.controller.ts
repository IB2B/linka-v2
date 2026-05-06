import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth";
import { rankRecycleCandidates } from "../lib/recycle-ranker";
import { getSettings } from "../models/recycle-settings.model";

export async function listCandidates(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    const userId = req.user!.id;
    const settings = await getSettings(userId);
    const candidates = await rankRecycleCandidates(userId, settings.minAgeDays);
    res.json({ candidates });
  } catch (e) { next(e); }
}
