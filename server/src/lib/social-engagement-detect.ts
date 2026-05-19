import type { RowDataPacket } from "mysql2";
import { db } from "./db";
import { LOOKBACK_DAYS, MIN_DELTA } from "./social-engagement-config";

interface SnapRow extends RowDataPacket {
  post_id: string; user_id: string; likes: number; comments: number; fetched_at: Date;
}

export type DetectedEvent = {
  userId: string; postId: string; kind: "likes" | "comments";
  delta: number; totalAfter: number;
};

export async function detectEngagementDeltas(): Promise<DetectedEvent[]> {
  const [rows] = await db.query<SnapRow[]>(
    `SELECT s.post_id, s.user_id, s.likes, s.comments, s.fetched_at
     FROM post_metric_snapshots s
     INNER JOIN generated_content g ON g.id = s.post_id
     WHERE g.posted_at >= NOW() - INTERVAL ? DAY
     ORDER BY s.post_id, s.fetched_at DESC`,
    [LOOKBACK_DAYS],
  );
  // We only need the two most recent snapshots per post. Smaller deltas in
  // between get collapsed into the latest one — that's fine, the UNIQUE KEY
  // on (post_id, kind, total_after) prevents firing the same milestone twice.
  const byPost = new Map<string, SnapRow[]>();
  for (const r of rows) {
    const arr = byPost.get(r.post_id) ?? [];
    if (arr.length < 2) { arr.push(r); byPost.set(r.post_id, arr); }
  }
  const events: DetectedEvent[] = [];
  for (const arr of byPost.values()) {
    if (arr.length < 2) continue;
    const [latest, prev] = arr;
    const lDelta = latest.likes - prev.likes;
    const cDelta = latest.comments - prev.comments;
    if (lDelta >= MIN_DELTA) {
      events.push({ userId: latest.user_id, postId: latest.post_id, kind: "likes", delta: lDelta, totalAfter: latest.likes });
    }
    if (cDelta >= MIN_DELTA) {
      events.push({ userId: latest.user_id, postId: latest.post_id, kind: "comments", delta: cDelta, totalAfter: latest.comments });
    }
  }
  return events;
}
