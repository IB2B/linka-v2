import type { Response, NextFunction } from "express";
import type { RowDataPacket } from "mysql2";
import { db } from "../lib/db";
import type { AuthRequest } from "../middleware/auth";

interface Row extends RowDataPacket {
  platform: string;
  post_count: number;
  avg_likes: number;
  avg_comments: number;
  avg_shares: number;
  avg_views: number;
  avg_impressions: number;
  avg_engagement_rate: number;
}

const QUERY = `
  SELECT
    COALESCE(p.platform, 'unspecified') AS platform,
    COUNT(DISTINCT p.id) AS post_count,
    AVG(COALESCE(s.likes, 0)) AS avg_likes,
    AVG(COALESCE(s.comments, 0)) AS avg_comments,
    AVG(COALESCE(s.shares, 0)) AS avg_shares,
    AVG(COALESCE(s.views, 0)) AS avg_views,
    AVG(COALESCE(s.impressions, 0)) AS avg_impressions,
    AVG(COALESCE(s.engagement_rate, 0)) AS avg_engagement_rate
  FROM generated_content p
  LEFT JOIN (
    SELECT t.post_id, t.likes, t.comments, t.shares, t.views,
           t.impressions, t.engagement_rate
    FROM post_metric_snapshots t
    JOIN (
      SELECT post_id, MAX(fetched_at) AS max_at
      FROM post_metric_snapshots WHERE user_id = ? GROUP BY post_id
    ) latest ON latest.post_id = t.post_id AND latest.max_at = t.fetched_at
  ) s ON s.post_id = p.id
  WHERE p.user_id = ? AND p.status = 'posted'
  GROUP BY platform
  ORDER BY avg_views DESC`;

export async function getPlatformMetrics(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    const [rows] = await db.query<Row[]>(QUERY, [req.user!.id, req.user!.id]);
    res.json({
      platforms: rows.map((r) => ({
        platform: r.platform,
        postCount: Number(r.post_count),
        avgLikes: Math.round(Number(r.avg_likes) * 10) / 10,
        avgComments: Math.round(Number(r.avg_comments) * 10) / 10,
        avgShares: Math.round(Number(r.avg_shares) * 10) / 10,
        avgViews: Math.round(Number(r.avg_views) * 10) / 10,
        avgImpressions: Math.round(Number(r.avg_impressions) * 10) / 10,
        avgEngagementRate: Math.round(Number(r.avg_engagement_rate) * 1000) / 1000,
      })),
    });
  } catch (e) { next(e); }
}
