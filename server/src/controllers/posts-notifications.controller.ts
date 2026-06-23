import type { Response, NextFunction } from "express";
import type { RowDataPacket } from "mysql2";
import { db } from "../lib/db";
import type { AuthRequest } from "../middleware/auth";

interface Row extends RowDataPacket {
  id: string;
  content: string;
  status: "failed" | "scheduled" | "draft";
  scheduled_for: Date | null;
  posted_at: Date | null;
  created_at: Date;
}

const QUERY = `
  SELECT id, content, status, scheduled_for, posted_at, created_at
  FROM generated_content
  WHERE user_id = ?
    AND (
      (status = 'failed' AND COALESCE(posted_at, created_at) >= DATE_SUB(NOW(), INTERVAL 30 DAY))
      OR (status = 'scheduled' AND scheduled_for IS NOT NULL
          AND scheduled_for >= NOW()
          AND scheduled_for <= DATE_ADD(NOW(), INTERVAL 1 DAY))
      OR (status = 'draft' AND created_at >= DATE_SUB(NOW(), INTERVAL 1 DAY))
    )
  ORDER BY COALESCE(scheduled_for, posted_at, created_at) DESC
  LIMIT 12`;

export async function listNotifications(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    const [rows] = await db.query<Row[]>(QUERY, [req.user!.id]);
    res.json({
      items: rows.map((r) => ({
        id: r.id,
        content: r.content,
        status: r.status,
        scheduledFor: r.scheduled_for ? r.scheduled_for.toISOString() : null,
        postedAt: r.posted_at ? r.posted_at.toISOString() : null,
        createdAt: r.created_at.toISOString(),
      })),
    });
  } catch (e) { next(e); }
}
