import type { Response, NextFunction } from "express";
import { db } from "../lib/db";
import type { AuthRequest } from "../middleware/auth";
import { markKeysRead } from "../models/notification-reads.model";
import {
  POST_NOTIFICATIONS_QUERY, notificationKey,
  type PostNotificationRow,
} from "../lib/post-notifications-query";

const KEY = /^(fail|up|gen)-[A-Za-z0-9-]{1,80}$/;

export async function markPostOneRead(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    const key = String(req.params.key);
    if (!KEY.test(key)) {
      res.status(400).json({ error: "Invalid notification key" });
      return;
    }
    await markKeysRead(req.user!.id, [key]);
    res.json({ ok: true });
  } catch (e) { next(e); }
}

// Recomputes the live notification set so "read all" marks exactly what the
// bell is currently showing — nothing more.
export async function markPostAllRead(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    const userId = req.user!.id;
    const [rows] = await db.query<PostNotificationRow[]>(
      POST_NOTIFICATIONS_QUERY, [userId],
    );
    await markKeysRead(userId, rows.map(notificationKey));
    res.json({ ok: true });
  } catch (e) { next(e); }
}
