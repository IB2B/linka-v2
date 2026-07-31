import type { Response, NextFunction } from "express";
import { db } from "../lib/db";
import type { AuthRequest } from "../middleware/auth";
import { listReadKeys } from "../models/notification-reads.model";
import {
  POST_NOTIFICATIONS_QUERY, notificationKey,
  type PostNotificationRow,
} from "../lib/post-notifications-query";

export async function listNotifications(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    const userId = req.user!.id;
    const [[rows], read] = await Promise.all([
      db.query<PostNotificationRow[]>(POST_NOTIFICATIONS_QUERY, [userId]),
      listReadKeys(userId),
    ]);
    res.json({
      items: rows.map((r) => ({
        id: r.id,
        content: r.content,
        status: r.status,
        scheduledFor: r.scheduled_for ? r.scheduled_for.toISOString() : null,
        postedAt: r.posted_at ? r.posted_at.toISOString() : null,
        createdAt: r.created_at.toISOString(),
        seen: read.has(notificationKey(r)),
      })),
    });
  } catch (e) { next(e); }
}
