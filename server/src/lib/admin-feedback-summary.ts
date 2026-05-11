import { db } from "./db";

export type FeedbackByCategory = { category: string; count: number };

export type FeedbackSummary = {
  total: number;
  new: number;
  triaged: number;
  closed: number;
  last7d: number;
  byCategory: FeedbackByCategory[];
};

export async function getFeedbackSummary(): Promise<FeedbackSummary> {
  const [statusRows] = await db.query<any[]>(
    `SELECT status, COUNT(*) AS c FROM feedback GROUP BY status`,
  );
  const [catRows] = await db.query<any[]>(
    `SELECT category, COUNT(*) AS c FROM feedback GROUP BY category ORDER BY c DESC`,
  );
  const [[totals]] = await db.query<any[]>(
    `SELECT COUNT(*) AS total,
            SUM(created_at >= NOW() - INTERVAL 7 DAY) AS last7d
     FROM feedback`,
  );
  const byStatus: Record<string, number> = {};
  for (const r of statusRows) byStatus[r.status] = Number(r.c ?? 0);
  return {
    total: Number(totals?.total ?? 0),
    new: byStatus.new ?? 0,
    triaged: byStatus.triaged ?? 0,
    closed: byStatus.closed ?? 0,
    last7d: Number(totals?.last7d ?? 0),
    byCategory: catRows.map((r) => ({
      category: r.category, count: Number(r.c ?? 0),
    })),
  };
}
