import { db } from "./db";

export type Funnel = {
  signups: number;
  activated: number; // >=1 posted
  engaged: number;   // >=5 posted
};

export type HourPoint = { hour: number; count: number };
export type IndustryRow = { industry: string; count: number };

export async function getFunnel(days: number): Promise<Funnel> {
  const [[r]] = await db.query<any[]>(
    `SELECT
       COUNT(*) AS signups,
       SUM(EXISTS(
         SELECT 1 FROM generated_content g
         WHERE g.user_id = u.id AND g.status = 'posted'
       )) AS activated,
       SUM((
         SELECT COUNT(*) FROM generated_content g
         WHERE g.user_id = u.id AND g.status = 'posted'
       ) >= 5) AS engaged
     FROM users u
     WHERE u.created_at >= NOW() - INTERVAL ? DAY`,
    [days],
  );
  return {
    signups: Number(r?.signups ?? 0),
    activated: Number(r?.activated ?? 0),
    engaged: Number(r?.engaged ?? 0),
  };
}

export async function getPostingByHour(days: number): Promise<HourPoint[]> {
  const [rows] = await db.query<any[]>(
    `SELECT HOUR(posted_at) h, COUNT(*) c
     FROM generated_content
     WHERE status='posted' AND posted_at >= NOW() - INTERVAL ? DAY
     GROUP BY h`,
    [days],
  );
  const map: Record<number, number> = {};
  for (const r of rows) map[Number(r.h)] = Number(r.c ?? 0);
  return Array.from({ length: 24 }, (_, hour) => ({ hour, count: map[hour] ?? 0 }));
}

export async function getIndustryBreakdown(): Promise<IndustryRow[]> {
  const [rows] = await db.query<any[]>(
    `SELECT industry, COUNT(*) c
     FROM user_profiles
     WHERE industry IS NOT NULL AND industry <> ''
     GROUP BY industry ORDER BY c DESC LIMIT 8`,
  );
  return rows.map((r) => ({ industry: r.industry, count: Number(r.c ?? 0) }));
}
