import { db } from "./db";

export type SeriesPoint = { date: string; signups: number; posts: number };

export async function getDailySeries(days = 30): Promise<SeriesPoint[]> {
  const [signups] = await db.query<any[]>(
    `SELECT DATE_FORMAT(created_at, '%Y-%m-%d') d, COUNT(*) c FROM users
     WHERE created_at >= NOW() - INTERVAL ? DAY
     GROUP BY d`,
    [days],
  );
  const [posts] = await db.query<any[]>(
    `SELECT DATE_FORMAT(created_at, '%Y-%m-%d') d, COUNT(*) c FROM generated_content
     WHERE created_at >= NOW() - INTERVAL ? DAY
     GROUP BY d`,
    [days],
  );
  const su: Record<string, number> = {};
  const po: Record<string, number> = {};
  for (const r of signups) su[String(r.d)] = Number(r.c ?? 0);
  for (const r of posts) po[String(r.d)] = Number(r.c ?? 0);

  const out: SeriesPoint[] = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const key = `${y}-${m}-${day}`;
    out.push({ date: key, signups: su[key] ?? 0, posts: po[key] ?? 0 });
  }
  return out;
}
