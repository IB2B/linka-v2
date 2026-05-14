import { db } from "./db";

type CountRow = { key: string; count: number };

export async function getModelBreakdown(days: number): Promise<CountRow[]> {
  const [rows] = await db.query<any[]>(
    `SELECT k, SUM(c) c FROM (
       SELECT COALESCE(model,'unknown') k, COUNT(*) c
       FROM generated_content
       WHERE created_at >= NOW() - INTERVAL ? DAY
       GROUP BY model
       UNION ALL
       SELECT image_model k, COUNT(*) c
       FROM generated_content
       WHERE image_status = 'completed'
         AND image_model IS NOT NULL
         AND created_at >= NOW() - INTERVAL ? DAY
       GROUP BY image_model
     ) t GROUP BY k ORDER BY c DESC`,
    [days, days],
  );
  return rows.map((r) => ({ key: r.k, count: Number(r.c ?? 0) }));
}
