import { db } from "./db";

export type FlagsByReason = { reason: string; count: number };

export type ModerationSummary = {
  pending: number;
  reviewing: number;
  actionedLast30d: number;
  dismissedLast30d: number;
  totalOpen: number;
  byReason: FlagsByReason[];
};

export async function getModerationSummary(): Promise<ModerationSummary> {
  const [statusRows] = await db.query<any[]>(
    `SELECT status, COUNT(*) AS c FROM content_flags GROUP BY status`,
  );
  const [reasonRows] = await db.query<any[]>(
    `SELECT reason, COUNT(*) AS c FROM content_flags
     WHERE status IN ('pending','reviewing') GROUP BY reason ORDER BY c DESC`,
  );
  const [[recent]] = await db.query<any[]>(
    `SELECT
       SUM(status='actioned' AND reviewed_at >= NOW() - INTERVAL 30 DAY) AS actioned_30d,
       SUM(status='dismissed' AND reviewed_at >= NOW() - INTERVAL 30 DAY) AS dismissed_30d
     FROM content_flags`,
  );
  const get = (s: string) => Number(statusRows.find((r) => r.status === s)?.c ?? 0);
  const pending = get("pending");
  const reviewing = get("reviewing");
  return {
    pending, reviewing,
    actionedLast30d: Number(recent?.actioned_30d ?? 0),
    dismissedLast30d: Number(recent?.dismissed_30d ?? 0),
    totalOpen: pending + reviewing,
    byReason: reasonRows.map((r) => ({ reason: r.reason, count: Number(r.c ?? 0) })),
  };
}
