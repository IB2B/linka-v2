import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth";
import { getPublishedByContentIds } from "../models/posting-history.model";

export async function listPublishedPlatforms(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    const raw = typeof req.query.ids === "string" ? req.query.ids : "";
    const ids = raw.split(",").map((s) => s.trim()).filter(Boolean);
    const map = await getPublishedByContentIds(req.user!.id, ids);
    const out: Record<string, string[]> = {};
    for (const [k, v] of map) out[k] = v;
    res.json({ map: out });
  } catch (e) { next(e); }
}
