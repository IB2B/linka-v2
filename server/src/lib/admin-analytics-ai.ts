import { db } from "./db";

export type AiImageStatus =
  "pending" | "generating" | "completed" | "failed" | "skipped";

export type AiUsage = {
  drafts: number;
  posted: number;
  imagesCompleted: number;
  imagesFailed: number;
  imageBreakdown: { key: AiImageStatus; count: number }[];
};

export async function getAiUsage(days: number): Promise<AiUsage> {
  const [[draftsRow]] = await db.query<any[]>(
    `SELECT COUNT(*) v FROM generated_content
     WHERE created_at >= NOW() - INTERVAL ? DAY`,
    [days],
  );
  const [[postedRow]] = await db.query<any[]>(
    `SELECT COUNT(*) v FROM generated_content
     WHERE status='posted' AND posted_at >= NOW() - INTERVAL ? DAY`,
    [days],
  );
  const [rows] = await db.query<any[]>(
    `SELECT image_status k, COUNT(*) c FROM generated_content
     WHERE created_at >= NOW() - INTERVAL ? DAY
     GROUP BY image_status`,
    [days],
  );
  const map: Record<string, number> = {};
  for (const r of rows) map[String(r.k)] = Number(r.c ?? 0);
  const order: AiImageStatus[] =
    ["completed", "failed", "generating", "pending", "skipped"];
  return {
    drafts: Number(draftsRow?.v ?? 0),
    posted: Number(postedRow?.v ?? 0),
    imagesCompleted: map.completed ?? 0,
    imagesFailed: map.failed ?? 0,
    imageBreakdown: order
      .map((k) => ({ key: k, count: map[k] ?? 0 }))
      .filter((r) => r.count > 0),
  };
}
