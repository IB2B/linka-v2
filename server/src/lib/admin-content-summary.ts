import { db } from "./db";

export type ContentByStatus = { status: string; count: number };
export type ContentByPlatform = { platform: string; count: number };

export type ContentSummary = {
  total: number;
  thisMonth: number;
  prevMonth: number;
  posted: number;
  scheduled: number;
  failed: number;
  drafts: number;
  withImage: number;
  byStatus: ContentByStatus[];
  byPlatform: ContentByPlatform[];
};

export async function getContentSummary(): Promise<ContentSummary> {
  const [statusRows] = await db.query<any[]>(
    `SELECT status, COUNT(*) AS c FROM generated_content GROUP BY status`,
  );
  const [platformRows] = await db.query<any[]>(
    `SELECT platform, COUNT(*) AS c FROM generated_content
     WHERE platform IS NOT NULL GROUP BY platform ORDER BY c DESC LIMIT 8`,
  );
  const [[totals]] = await db.query<any[]>(
    `SELECT
       COUNT(*) AS total,
       SUM(image_url IS NOT NULL) AS with_image,
       SUM(created_at >= DATE_FORMAT(NOW(), '%Y-%m-01')) AS this_month,
       SUM(created_at >= DATE_FORMAT(NOW() - INTERVAL 1 MONTH, '%Y-%m-01')
           AND created_at <  DATE_FORMAT(NOW(), '%Y-%m-01')) AS prev_month
     FROM generated_content`,
  );

  const byStatus = statusRows.map((r) => ({
    status: r.status ?? "draft", count: Number(r.c ?? 0),
  }));
  const get = (s: string) => byStatus.find((x) => x.status === s)?.count ?? 0;

  return {
    total: Number(totals?.total ?? 0),
    thisMonth: Number(totals?.this_month ?? 0),
    prevMonth: Number(totals?.prev_month ?? 0),
    posted: get("posted"),
    scheduled: get("scheduled"),
    failed: get("failed"),
    drafts: get("draft"),
    withImage: Number(totals?.with_image ?? 0),
    byStatus,
    byPlatform: platformRows.map((r) => ({
      platform: r.platform, count: Number(r.c ?? 0),
    })),
  };
}
