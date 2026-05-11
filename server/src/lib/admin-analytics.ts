import { db } from "./db";

export type AnalyticsKpi = { curr: number; prev: number };

async function scalar(sql: string, params: any[]): Promise<number> {
  const [[r]] = await db.query<any[]>(sql, params);
  return Number(r?.v ?? 0);
}

export async function getAnalyticsKpis(days: number) {
  const d = String(days);
  const [signups, signupsPrev, posts, postsPrev, pub, pubPrev,
    failed, failedPrev] = await Promise.all([
    scalar(`SELECT COUNT(*) v FROM users WHERE created_at >= NOW() - INTERVAL ? DAY`, [d]),
    scalar(`SELECT COUNT(*) v FROM users
      WHERE created_at >= NOW() - INTERVAL ? DAY
        AND created_at <  NOW() - INTERVAL ? DAY`, [String(days * 2), d]),
    scalar(`SELECT COUNT(*) v FROM generated_content
      WHERE status='posted' AND posted_at >= NOW() - INTERVAL ? DAY`, [d]),
    scalar(`SELECT COUNT(*) v FROM generated_content
      WHERE status='posted' AND posted_at >= NOW() - INTERVAL ? DAY
        AND posted_at <  NOW() - INTERVAL ? DAY`, [String(days * 2), d]),
    scalar(`SELECT COUNT(DISTINCT user_id) v FROM generated_content
      WHERE status='posted' AND posted_at >= NOW() - INTERVAL ? DAY`, [d]),
    scalar(`SELECT COUNT(DISTINCT user_id) v FROM generated_content
      WHERE status='posted' AND posted_at >= NOW() - INTERVAL ? DAY
        AND posted_at <  NOW() - INTERVAL ? DAY`, [String(days * 2), d]),
    scalar(`SELECT COUNT(*) v FROM generated_content
      WHERE status='failed' AND created_at >= NOW() - INTERVAL ? DAY`, [d]),
    scalar(`SELECT COUNT(*) v FROM generated_content
      WHERE status='failed' AND created_at >= NOW() - INTERVAL ? DAY
        AND created_at <  NOW() - INTERVAL ? DAY`, [String(days * 2), d]),
  ]);
  return {
    signups: { curr: signups, prev: signupsPrev } as AnalyticsKpi,
    postsPublished: { curr: posts, prev: postsPrev } as AnalyticsKpi,
    activePublishers: { curr: pub, prev: pubPrev } as AnalyticsKpi,
    failures: { curr: failed, prev: failedPrev } as AnalyticsKpi,
  };
}
