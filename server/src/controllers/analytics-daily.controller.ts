import type { Response, NextFunction } from "express";
import type { RowDataPacket } from "mysql2";
import { db } from "../lib/db";
import type { AuthRequest } from "../middleware/auth";

interface Row extends RowDataPacket {
  day: string;
  likes: string | number;
  comments: string | number;
  views: string | number;
  impressions: string | number;
  posts: number;
}

const QUERY = `
  SELECT DATE(p.posted_at) AS day,
         COALESCE(SUM(s.likes), 0) AS likes,
         COALESCE(SUM(s.comments), 0) AS comments,
         COALESCE(SUM(s.views), 0) AS views,
         COALESCE(SUM(s.impressions), 0) AS impressions,
         COUNT(DISTINCT p.id) AS posts
  FROM generated_content p
  LEFT JOIN (
    SELECT t.post_id, t.likes, t.comments, t.views, t.impressions
    FROM post_metric_snapshots t
    JOIN (
      SELECT post_id, MAX(fetched_at) AS max_at
      FROM post_metric_snapshots
      WHERE user_id = ?
      GROUP BY post_id
    ) latest ON latest.post_id = t.post_id AND latest.max_at = t.fetched_at
  ) s ON s.post_id = p.id
  WHERE p.user_id = ?
    AND p.posted_at IS NOT NULL
    AND p.posted_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
  GROUP BY DATE(p.posted_at)
  ORDER BY day ASC`;

export async function getDailyEngagement(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    const days = Math.min(Math.max(Number(req.query.days ?? 30), 7), 90);
    const userId = req.user!.id;
    const [rows] = await db.query<Row[]>(QUERY, [userId, userId, days]);
    const series = rows.map((r) => ({
      date: typeof r.day === "string" ? r.day : new Date(r.day).toISOString().slice(0, 10),
      likes: Number(r.likes),
      comments: Number(r.comments),
      views: Number(r.views),
      impressions: Number(r.impressions),
      posts: Number(r.posts),
    }));
    res.json({ series, days });
  } catch (e) { next(e); }
}
