import type { Response, NextFunction } from "express";
import { db } from "../lib/db";
import type { AuthRequest } from "../middleware/auth";

export async function markSocialOneRead(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    await db.query(
      `UPDATE social_engagement_events
       SET seen_at = NOW(3)
       WHERE id = ? AND user_id = ? AND seen_at IS NULL`,
      [String(req.params.id), req.user!.id],
    );
    res.json({ ok: true });
  } catch (e) { next(e); }
}

export async function markSocialAllRead(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    await db.query(
      `UPDATE social_engagement_events
       SET seen_at = NOW(3) WHERE user_id = ? AND seen_at IS NULL`,
      [req.user!.id],
    );
    res.json({ ok: true });
  } catch (e) { next(e); }
}
