import type { RowDataPacket } from "mysql2";
import { db } from "../lib/db";

export type PublishOutcomeRow = {
  platform: string;
  status: "posted" | "failed";
  error?: string | null;
};

interface ExistingRow extends RowDataPacket { platform: string }

export async function recordOutcomes(
  userId: string, contentId: string, outcomes: PublishOutcomeRow[],
): Promise<void> {
  if (outcomes.length === 0) return;
  const [existing] = await db.query<ExistingRow[]>(
    `SELECT platform FROM posting_history
     WHERE user_id = ? AND content_id = ? AND status = 'posted'`,
    [userId, contentId],
  );
  const seen = new Set(existing.map((r) => r.platform));
  const fresh = outcomes.filter((o) => !(o.status === "posted" && seen.has(o.platform)));
  if (fresh.length === 0) return;
  const rows = fresh.map((o) => [
    userId, contentId, o.platform, o.status,
    o.status === "posted" ? new Date() : null, o.error ?? null,
  ]);
  await db.query(
    `INSERT INTO posting_history
       (user_id, content_id, platform, status, posted_at, error_msg)
     VALUES ?`,
    [rows],
  );
}

interface Row extends RowDataPacket {
  content_id: string;
  platform: string;
}

export async function getPublishedByContentIds(
  userId: string, contentIds: string[],
): Promise<Map<string, string[]>> {
  const map = new Map<string, string[]>();
  if (contentIds.length === 0) return map;
  const placeholders = contentIds.map(() => "?").join(",");
  const [rows] = await db.query<Row[]>(
    `SELECT content_id, platform FROM posting_history
     WHERE user_id = ? AND status = 'posted'
       AND content_id IN (${placeholders})`,
    [userId, ...contentIds],
  );
  for (const r of rows) {
    const list = map.get(r.content_id) ?? [];
    if (!list.includes(r.platform)) list.push(r.platform);
    map.set(r.content_id, list);
  }
  return map;
}
