import { db } from "./db";
import { fetchLatePost, publishedPlatforms } from "./late-posts";
import { markPosted } from "../models/generated-content.model";
import { recordOutcomes } from "../models/posting-history.model";
import type { RowDataPacket } from "mysql2";

interface ScheduledRow extends RowDataPacket {
  id: string;
  late_post_id: string;
  status: "scheduled" | "posted";
  scheduled_platforms: string | null;
}

export async function syncScheduledPosts(userId: string): Promise<void> {
  const [rows] = await db.query<ScheduledRow[]>(
    `SELECT id, late_post_id, status, scheduled_platforms FROM generated_content
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
    let scheduled: string[] = [];
    try { scheduled = JSON.parse(row.scheduled_platforms ?? "[]") ?? []; } catch {}
    if (posted.length < scheduled.length) {
      console.log(
        "[sync] partial publish", row.id,
        "scheduled=", scheduled,
        "zernioReturned=", JSON.stringify(r.raw),
      );
    }
    if (posted.length === 0) return;
    if (row.status === "scheduled") await markPosted(row.id, userId, row.late_post_id);
    await recordOutcomes(userId, row.id, posted.map((p) => ({
      platform: p.platform, status: "posted" as const,
    })));
  } catch (e) {
    console.error("[sync-scheduled]", row.id, e);
  }
}
