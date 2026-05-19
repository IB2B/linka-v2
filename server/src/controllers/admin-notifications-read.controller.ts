import type { Response, NextFunction } from "express";
import { db } from "../lib/db";
import type { AuthRequest } from "../middleware/auth";

export async function markOneRead(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    await db.query(
      "UPDATE support_tickets SET admin_seen_at = NOW(3) WHERE id = ? AND admin_seen_at IS NULL",
      [req.params.id],
    );
    res.json({ ok: true });
  } catch (e) { next(e); }
}

export async function markAllRead(
  _req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    await db.query(
      `UPDATE support_tickets SET admin_seen_at = NOW(3)
       WHERE status <> 'closed' AND admin_seen_at IS NULL`,
    );
    res.json({ ok: true });
  } catch (e) { next(e); }
}
