import { db } from "./db";

export type AnalyticsPoint = {
  date: string; signups: number; published: number; failed: number;
};

export async function getAnalyticsSeries(days: number): Promise<AnalyticsPoint[]> {
  const [signups] = await db.query<any[]>(
    `SELECT DATE_FORMAT(created_at, '%Y-%m-%d') d, COUNT(*) c
     FROM users WHERE created_at >= NOW() - INTERVAL ? DAY GROUP BY d`,
    [days],
  );
  const [published] = await db.query<any[]>(
    `SELECT DATE_FORMAT(posted_at, '%Y-%m-%d') d, COUNT(*) c
     FROM generated_content
     WHERE status='posted' AND posted_at >= NOW() - INTERVAL ? DAY GROUP BY d`,
    [days],
  );
  const [failed] = await db.query<any[]>(
    `SELECT DATE_FORMAT(created_at, '%Y-%m-%d') d, COUNT(*) c
     FROM generated_content
     WHERE status='failed' AND created_at >= NOW() - INTERVAL ? DAY GROUP BY d`,
    [days],
  );
  const mapOf = (rows: any[]): Record<string, number> => {
    const m: Record<string, number> = {};
    for (const r of rows) m[String(r.d)] = Number(r.c ?? 0);
    return m;
  };
  const su = mapOf(signups);
  const pu = mapOf(published);
  const fa = mapOf(failed);

  const out: AnalyticsPoint[] = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    out.push({
      date: key, signups: su[key] ?? 0,
      published: pu[key] ?? 0, failed: fa[key] ?? 0,
    });
  }
  return out;
}
