import { db } from "./db";
import { fetchLatePost, publishedPlatforms, failedPlatforms } from "./late-posts";
import { markPosted } from "../models/generated-content.model";
import { recordOutcomes } from "../models/posting-history.model";
import { sendPostPublishedEmail, sendPostFailedEmail } from "./post-event-emails";
import { tryClaimNotification } from "./notification-log";
import type { RowDataPacket } from "mysql2";

interface ScheduledRow extends RowDataPacket {
  id: string;
  late_post_id: string;
  status: "scheduled" | "posted";
  scheduled_platforms: string | null;
  content: string;
}

export async function syncScheduledPosts(userId: string): Promise<void> {
  const [rows] = await db.query<ScheduledRow[]>(
    `SELECT id, late_post_id, status, scheduled_platforms, content FROM generated_content
     WHERE user_id = ? AND late_post_id IS NOT NULL
       AND (
         (status = 'scheduled' AND (scheduled_for IS NULL OR scheduled_for <= NOW()))
         OR (status = 'posted' AND posted_at >= (NOW() - INTERVAL 7 DAY))
       )
     ORDER BY COALESCE(posted_at, scheduled_for, created_at) DESC
     LIMIT 50`,
    [userId],
  );
  await Promise.all(rows.map((r) => syncOne(userId, r)));
}

async function syncOne(userId: string, row: ScheduledRow) {
  try {
    const r = await fetchLatePost(row.late_post_id);
    if (r.state !== "ok") return;
    const posted = publishedPlatforms(r.platforms);
    const failed = failedPlatforms(r.platforms);
    const excerpt = row.content.slice(0, 140);
    if (failed.length > 0 && await tryClaimNotification(userId, "post_failed", row.id)) {
      sendPostFailedEmail(userId, row.id, excerpt, failed.map((p) => p.platform))
        .catch((e) => console.error("[email] post-failed", e));
    }
    if (posted.length === 0) return;
    const transitioned = row.status === "scheduled";
    if (transitioned) await markPosted(row.id, userId, row.late_post_id);
    await recordOutcomes(userId, row.id, posted.map((p) => ({
      platform: p.platform, status: "posted" as const,
    })));
    if (transitioned) {
      sendPostPublishedEmail(userId, row.id, excerpt, posted.map((p) => p.platform))
        .catch((e) => console.error("[email] post-published", e));
    }
  } catch (e) {
    console.error("[sync-scheduled]", row.id, e);
  }
}
