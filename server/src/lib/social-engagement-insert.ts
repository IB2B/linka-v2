import type { ResultSetHeader } from "mysql2";
import { db } from "./db";
import type { DetectedEvent } from "./social-engagement-detect";

async function insertOne(e: DetectedEvent): Promise<DetectedEvent | null> {
  try {
    const [r] = await db.query<ResultSetHeader>(
      `INSERT IGNORE INTO social_engagement_events
         (user_id, post_id, kind, delta, total_after)
       VALUES (?, ?, ?, ?, ?)`,
      [e.userId, e.postId, e.kind, e.delta, e.totalAfter],
    );
    return r.affectedRows > 0 ? e : null;
  } catch (err) {
    console.error("[social-engagement] insert failed", err);
    return null;
  }
}

export async function insertEngagementEvents(events: DetectedEvent[]): Promise<DetectedEvent[]> {
  const results = await Promise.all(events.map(insertOne));
  return results.filter((e): e is DetectedEvent => e !== null);
}
