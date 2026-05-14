import { db } from "./db";

export type Kpi = { curr: number; prev: number };

async function scalar(sql: string, params: any[]): Promise<number> {
  const [[r]] = await db.query<any[]>(sql, params);
  return Number(r?.v ?? 0);
}

export async function getAiUsageKpis(days: number) {
  const d = String(days);
  const d2 = String(days * 2);
  const [drafts, draftsPrev, posted, postedPrev, imgs, imgsPrev,
    failed, failedPrev,
    tokIn, tokInPrev, tokOut, tokOutPrev] = await Promise.all([
    scalar(`SELECT COUNT(*) v FROM generated_content
      WHERE created_at >= NOW() - INTERVAL ? DAY`, [d]),
    scalar(`SELECT COUNT(*) v FROM generated_content
      WHERE created_at >= NOW() - INTERVAL ? DAY
        AND created_at <  NOW() - INTERVAL ? DAY`, [d2, d]),
    scalar(`SELECT COUNT(*) v FROM generated_content
      WHERE status='posted' AND posted_at >= NOW() - INTERVAL ? DAY`, [d]),
    scalar(`SELECT COUNT(*) v FROM generated_content
      WHERE status='posted' AND posted_at >= NOW() - INTERVAL ? DAY
        AND posted_at <  NOW() - INTERVAL ? DAY`, [d2, d]),
    scalar(`SELECT COUNT(*) v FROM generated_content
      WHERE image_status='completed' AND created_at >= NOW() - INTERVAL ? DAY`, [d]),
    scalar(`SELECT COUNT(*) v FROM generated_content
      WHERE image_status='completed' AND created_at >= NOW() - INTERVAL ? DAY
        AND created_at <  NOW() - INTERVAL ? DAY`, [d2, d]),
    scalar(`SELECT COUNT(*) v FROM generated_content
      WHERE image_status='failed' AND created_at >= NOW() - INTERVAL ? DAY`, [d]),
    scalar(`SELECT COUNT(*) v FROM generated_content
      WHERE image_status='failed' AND created_at >= NOW() - INTERVAL ? DAY
        AND created_at <  NOW() - INTERVAL ? DAY`, [d2, d]),
    scalar(`SELECT COALESCE(SUM(tokens_input),0) v FROM generated_content
      WHERE created_at >= NOW() - INTERVAL ? DAY`, [d]),
    scalar(`SELECT COALESCE(SUM(tokens_input),0) v FROM generated_content
      WHERE created_at >= NOW() - INTERVAL ? DAY
        AND created_at <  NOW() - INTERVAL ? DAY`, [d2, d]),
    scalar(`SELECT COALESCE(SUM(tokens_output),0) v FROM generated_content
      WHERE created_at >= NOW() - INTERVAL ? DAY`, [d]),
    scalar(`SELECT COALESCE(SUM(tokens_output),0) v FROM generated_content
      WHERE created_at >= NOW() - INTERVAL ? DAY
        AND created_at <  NOW() - INTERVAL ? DAY`, [d2, d]),
  ]);
  return {
    drafts: { curr: drafts, prev: draftsPrev } as Kpi,
    posted: { curr: posted, prev: postedPrev } as Kpi,
    imagesCompleted: { curr: imgs, prev: imgsPrev } as Kpi,
    imagesFailed: { curr: failed, prev: failedPrev } as Kpi,
    tokensInput: { curr: tokIn, prev: tokInPrev } as Kpi,
    tokensOutput: { curr: tokOut, prev: tokOutPrev } as Kpi,
  };
}
