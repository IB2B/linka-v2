import { db } from "./db";
import { fetchPostAnalytics } from "./late-analytics";
import { markPosted } from "../models/generated-content.model";
import { recordOutcomes } from "../models/posting-history.model";
import type { RowDataPacket } from "mysql2";

interface ScheduledRow extends RowDataPacket {
  id: string;
  late_post_id: string;
}

export async function syncScheduledPosts(userId: string): Promise<void> {
  const [rows] = await db.query<ScheduledRow[]>(
    `SELECT id, late_post_id FROM generated_content
     WHERE user_id = ? AND status = 'scheduled' AND late_post_id IS NOT NULL
     LIMIT 50`,
    [userId],
  );
  await Promise.all(rows.map((r) => syncOne(userId, r.id, r.late_post_id)));
}

async function syncOne(userId: string, postId: string, latePostId: string) {
  try {
    const r = await fetchPostAnalytics(latePostId);
    if (r.state !== "ok") return;
    const posted = r.platforms.filter((p) => p.status === "ok");
    if (posted.length === 0) return;
    await markPosted(postId, userId, latePostId);
    await recordOutcomes(userId, postId, posted.map((p) => ({
      platform: p.platform, status: "posted" as const,
    })));
  } catch (e) {
    console.error("[sync-scheduled]", postId, e);
  }
}
