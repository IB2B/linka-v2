import type { RowDataPacket } from "mysql2";
import { db } from "../lib/db";
import { POST_COLS, rowToPost, type PostRow } from "../models/generated-content-row";
import type { RecycleCandidate } from "../types/recycler";

interface CandidateRow extends PostRow {
  impressions: number; reach: number; likes: number; comments: number;
  shares: number; saves: number; clicks: number; views: number;
  engagement_rate: string | number;
  age_days: number;
}

const QUERY = `
  SELECT ${POST_COLS},
         s.impressions, s.reach, s.likes, s.comments, s.shares,
         s.saves, s.clicks, s.views, s.engagement_rate,
         TIMESTAMPDIFF(DAY, COALESCE(p.posted_at, p.created_at), NOW(3)) AS age_days
  FROM generated_content p
  LEFT JOIN (
    SELECT t.post_id, t.impressions, t.reach, t.likes, t.comments,
           t.shares, t.saves, t.clicks, t.views, t.engagement_rate
    FROM post_metric_snapshots t
    JOIN (
      SELECT post_id, MAX(fetched_at) AS max_at
      FROM post_metric_snapshots GROUP BY post_id
    ) latest
      ON latest.post_id = t.post_id AND latest.max_at = t.fetched_at
  ) s ON s.post_id = p.id
  WHERE p.user_id = ?
    AND p.status = 'posted'
    AND TIMESTAMPDIFF(DAY, COALESCE(p.posted_at, p.created_at), NOW(3)) >= ?
  ORDER BY p.posted_at DESC
  LIMIT 200`;

export async function rankRecycleCandidates(
  userId: string, minAgeDays: number,
): Promise<RecycleCandidate[]> {
  const [rows] = await db.query<(CandidateRow & RowDataPacket)[]>(
    QUERY, [userId, minAgeDays],
  );
  if (rows.length === 0) return [];

  const impressionsList = rows.map((r) => r.impressions ?? 0).sort((a, b) => a - b);
  const lowQuartile = impressionsList[Math.floor(impressionsList.length / 4)] ?? 0;

  const candidates: RecycleCandidate[] = rows.map((r) => {
    const er = Number(r.engagement_rate ?? 0);
    const impr = r.impressions ?? 0;
    const isUnderdog = er > 0.02 && impr <= lowQuartile;
    return {
      post: rowToPost(r),
      reason: isUnderdog ? "underdog" : "winner",
      score: isUnderdog ? er * 100 : er * 100 + Math.log1p(impr),
      metrics: {
        impressions: impr, reach: r.reach ?? 0,
        likes: r.likes ?? 0, comments: r.comments ?? 0, shares: r.shares ?? 0,
        saves: r.saves ?? 0, clicks: r.clicks ?? 0, views: r.views ?? 0,
        engagementRate: er,
      },
      ageDays: r.age_days ?? 0,
    };
  });

  return candidates.sort((a, b) => b.score - a.score).slice(0, 20);
}
