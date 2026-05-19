import type { Response, NextFunction } from "express";
import type { RowDataPacket } from "mysql2";
import { db } from "../lib/db";
import type { AuthRequest } from "../middleware/auth";

interface Row extends RowDataPacket {
  id: string; post_id: string; kind: "likes" | "comments";
  delta: number; total_after: number; content: string; platform: string | null;
  seen_at: Date | null; created_at: Date;
}

function excerpt(s: string, n: number): string {
  const chars = Array.from(s);
  return chars.length > n ? `${chars.slice(0, n).join("")}…` : s;
}

const QUERY = `
  SELECT e.id, e.post_id, e.kind, e.delta, e.total_after,
         e.seen_at, e.created_at, g.content, g.platform
  FROM social_engagement_events e
  INNER JOIN generated_content g ON g.id = e.post_id
  WHERE e.user_id = ? AND e.created_at >= NOW() - INTERVAL 14 DAY
  ORDER BY e.created_at DESC LIMIT 12`;

export async function listSocialNotifications(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    const [rows] = await db.query<Row[]>(QUERY, [req.user!.id]);
    res.json({
      items: rows.map((r) => ({
        id: r.id,
        postId: r.post_id,
        kind: r.kind,
        delta: r.delta,
        platform: r.platform ?? "Social",
        excerpt: excerpt(r.content, 80),
        createdAt: r.created_at.toISOString(),
        seenAt: r.seen_at ? r.seen_at.toISOString() : null,
      })),
    });
  } catch (e) { next(e); }
}
