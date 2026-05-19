import type { RowDataPacket } from "mysql2";
import { db } from "./db";
import { HIGH_VOLUME_THRESHOLD } from "./social-engagement-config";
import type { DetectedEvent } from "./social-engagement-detect";

export interface PostRow extends RowDataPacket {
  post_id: string; user_id: string; email: string; first_name: string; content: string;
}

export function groupHighVolumeByUser(events: DetectedEvent[]): Map<string, DetectedEvent[]> {
  const m = new Map<string, DetectedEvent[]>();
  for (const e of events) {
    if (e.kind !== "comments" || e.delta < HIGH_VOLUME_THRESHOLD) continue;
    const arr = m.get(e.userId) ?? [];
    arr.push(e); m.set(e.userId, arr);
  }
  return m;
}

export async function fetchPostsById(postIds: string[]): Promise<Map<string, PostRow>> {
  if (postIds.length === 0) return new Map();
  const placeholders = postIds.map(() => "?").join(",");
  const [rows] = await db.query<PostRow[]>(
    `SELECT g.id AS post_id, g.user_id, u.email, u.first_name, g.content
     FROM generated_content g JOIN users u ON u.id = g.user_id
     WHERE g.id IN (${placeholders})`,
    postIds,
  );
  return new Map(rows.map((r) => [r.post_id, r]));
}
