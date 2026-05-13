import type { Response, NextFunction } from "express";
import type { RowDataPacket } from "mysql2";
import { db } from "../lib/db";
import type { AuthRequest } from "../middleware/auth";

interface Row extends RowDataPacket {
  has_image: number;
  post_count: number;
  avg_likes: number;
  avg_comments: number;
  avg_shares: number;
  avg_saves: number;
  avg_views: number;
  avg_impressions: number;
}

const QUERY = `
  SELECT
    (p.image_url IS NOT NULL) AS has_image,
    COUNT(DISTINCT p.id) AS post_count,
    AVG(COALESCE(s.likes, 0)) AS avg_likes,
    AVG(COALESCE(s.comments, 0)) AS avg_comments,
    AVG(COALESCE(s.shares, 0)) AS avg_shares,
    AVG(COALESCE(s.saves, 0)) AS avg_saves,
    AVG(COALESCE(s.views, 0)) AS avg_views,
    AVG(COALESCE(s.impressions, 0)) AS avg_impressions
  FROM generated_content p
  LEFT JOIN (
    SELECT t.post_id, t.likes, t.comments, t.shares, t.saves, t.views, t.impressions
    FROM post_metric_snapshots t
    JOIN (
      SELECT post_id, MAX(fetched_at) AS max_at
      FROM post_metric_snapshots WHERE user_id = ? GROUP BY post_id
    ) latest ON latest.post_id = t.post_id AND latest.max_at = t.fetched_at
  ) s ON s.post_id = p.id
  WHERE p.user_id = ? AND p.status = 'posted'
  GROUP BY has_image`;

function round(n: number) { return Math.round(Number(n) * 10) / 10; }

export async function getImageRoi(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    const [rows] = await db.query<Row[]>(QUERY, [req.user!.id, req.user!.id]);
    const build = (r: Row) => ({
      postCount: Number(r.post_count),
      avgLikes: round(r.avg_likes),
      avgComments: round(r.avg_comments),
      avgShares: round(r.avg_shares),
      avgSaves: round(r.avg_saves),
      avgViews: round(r.avg_views),
      avgImpressions: round(r.avg_impressions),
    });
    const withImage = rows.find((r) => Number(r.has_image) === 1);
    const withoutImage = rows.find((r) => Number(r.has_image) === 0);
    res.json({
      withImage: withImage ? build(withImage) : null,
      withoutImage: withoutImage ? build(withoutImage) : null,
    });
  } catch (e) { next(e); }
}
