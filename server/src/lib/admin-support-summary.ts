import { db } from "./db";

export type SupportByCategory = { category: string; count: number };

export type SupportSummary = {
  total: number;
  open: number;
  pending: number;
  resolved: number;
  closed: number;
  urgent: number;
  last7d: number;
  byCategory: SupportByCategory[];
};

export async function getSupportSummary(): Promise<SupportSummary> {
  const [statusRows] = await db.query<any[]>(
    `SELECT status, COUNT(*) AS c FROM support_tickets GROUP BY status`,
  );
  const [catRows] = await db.query<any[]>(
    `SELECT category, COUNT(*) AS c FROM support_tickets
     WHERE category IS NOT NULL GROUP BY category ORDER BY c DESC`,
  );
  const [[totals]] = await db.query<any[]>(
    `SELECT COUNT(*) AS total,
            SUM(priority='urgent' AND status IN ('open','pending')) AS urgent,
            SUM(created_at >= NOW() - INTERVAL 7 DAY) AS last7d
     FROM support_tickets`,
  );
  const byStatus: Record<string, number> = {};
  for (const r of statusRows) byStatus[r.status] = Number(r.c ?? 0);
  return {
    total: Number(totals?.total ?? 0),
    open: byStatus.open ?? 0,
    pending: byStatus.pending ?? 0,
    resolved: byStatus.resolved ?? 0,
    closed: byStatus.closed ?? 0,
    urgent: Number(totals?.urgent ?? 0),
    last7d: Number(totals?.last7d ?? 0),
    byCategory: catRows.map((r) => ({
      category: r.category, count: Number(r.c ?? 0),
    })),
  };
}
