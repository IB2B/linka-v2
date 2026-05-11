import { db } from "./db";

export type AiUsagePoint = {
  date: string; drafts: number; images: number; failedImages: number;
};

export async function getAiUsageSeries(days: number): Promise<AiUsagePoint[]> {
  const [drafts] = await db.query<any[]>(
    `SELECT DATE_FORMAT(created_at, '%Y-%m-%d') d, COUNT(*) c
     FROM generated_content
     WHERE created_at >= NOW() - INTERVAL ? DAY
     GROUP BY d`,
    [days],
  );
  const [images] = await db.query<any[]>(
    `SELECT DATE_FORMAT(created_at, '%Y-%m-%d') d, COUNT(*) c
     FROM generated_content
     WHERE image_status='completed' AND created_at >= NOW() - INTERVAL ? DAY
     GROUP BY d`,
    [days],
  );
  const [failed] = await db.query<any[]>(
    `SELECT DATE_FORMAT(created_at, '%Y-%m-%d') d, COUNT(*) c
     FROM generated_content
     WHERE image_status='failed' AND created_at >= NOW() - INTERVAL ? DAY
     GROUP BY d`,
    [days],
  );
  const mapOf = (rows: any[]): Record<string, number> => {
    const m: Record<string, number> = {};
    for (const r of rows) m[String(r.d)] = Number(r.c ?? 0);
    return m;
  };
  const dr = mapOf(drafts);
  const im = mapOf(images);
  const fi = mapOf(failed);

  const out: AiUsagePoint[] = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    out.push({
      date: key, drafts: dr[key] ?? 0,
      images: im[key] ?? 0, failedImages: fi[key] ?? 0,
    });
  }
  return out;
}
