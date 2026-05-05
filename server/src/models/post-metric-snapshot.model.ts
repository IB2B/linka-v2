import type { RowDataPacket } from "mysql2";
import { db } from "../lib/db";
import type { PostMetrics, PostSnapshot } from "../types/analytics";

interface SnapshotRow extends RowDataPacket {
  fetched_at: Date;
  impressions: number; reach: number;
  likes: number; comments: number; shares: number;
  saves: number; clicks: number; views: number;
  engagement_rate: string | number;
}

const COLS = `fetched_at, impressions, reach, likes, comments, shares,
              saves, clicks, views, engagement_rate`;

function rowToSnapshot(r: SnapshotRow): PostSnapshot {
  return {
    fetchedAt: r.fetched_at.toISOString(),
    metrics: {
      impressions: r.impressions, reach: r.reach,
      likes: r.likes, comments: r.comments, shares: r.shares,
      saves: r.saves, clicks: r.clicks, views: r.views,
      engagementRate: Number(r.engagement_rate),
    },
  };
}

export async function insertSnapshot(
  postId: string, userId: string, m: PostMetrics,
): Promise<void> {
  await db.query(
    `INSERT INTO post_metric_snapshots
       (post_id, user_id, impressions, reach, likes, comments, shares,
        saves, clicks, views, engagement_rate)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [postId, userId, m.impressions, m.reach, m.likes, m.comments,
     m.shares, m.saves, m.clicks, m.views, m.engagementRate],
  );
}

export async function listSnapshots(postId: string): Promise<PostSnapshot[]> {
  const [rows] = await db.query<SnapshotRow[]>(
    `SELECT ${COLS} FROM post_metric_snapshots
     WHERE post_id = ? ORDER BY fetched_at ASC LIMIT 200`,
    [postId],
  );
  return rows.map(rowToSnapshot);
}

export async function lastSnapshotAgeSec(
  postId: string,
): Promise<number | null> {
  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT TIMESTAMPDIFF(SECOND, fetched_at, NOW(3)) AS age
     FROM post_metric_snapshots
     WHERE post_id = ? ORDER BY fetched_at DESC LIMIT 1`,
    [postId],
  );
  if (rows.length === 0) return null;
  return Number((rows[0] as { age: number }).age);
}
