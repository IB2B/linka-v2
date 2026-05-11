import { db } from "./db";

export type CountRow = { key: string; count: number };

export type TopPublisher = {
  id: string; email: string; firstName: string; lastName: string;
  avatarUrl: string | null; count: number;
};

export async function getPlatformBreakdown(days: number): Promise<CountRow[]> {
  const [rows] = await db.query<any[]>(
    `SELECT COALESCE(platform,'unknown') k, COUNT(*) c
     FROM generated_content
     WHERE status='posted' AND posted_at >= NOW() - INTERVAL ? DAY
     GROUP BY k ORDER BY c DESC LIMIT 8`,
    [days],
  );
  return rows.map((r) => ({ key: r.k, count: Number(r.c ?? 0) }));
}

export async function getPlanTierBreakdown(): Promise<CountRow[]> {
  const [rows] = await db.query<any[]>(
    `SELECT COALESCE(plan_tier,'free') k, COUNT(*) c
     FROM subscriptions GROUP BY k ORDER BY c DESC`,
  );
  return rows.map((r) => ({ key: r.k, count: Number(r.c ?? 0) }));
}

export async function getTopPublishers(days: number): Promise<TopPublisher[]> {
  const [rows] = await db.query<any[]>(
    `SELECT u.id, u.email, u.first_name, u.last_name, p.avatar_url,
            COUNT(g.id) c
     FROM generated_content g
     INNER JOIN users u ON u.id = g.user_id
     LEFT JOIN user_profiles p ON p.user_id = u.id
     WHERE g.status='posted' AND g.posted_at >= NOW() - INTERVAL ? DAY
     GROUP BY u.id ORDER BY c DESC LIMIT 10`,
    [days],
  );
  return rows.map((r) => ({
    id: r.id, email: r.email,
    firstName: r.first_name, lastName: r.last_name,
    avatarUrl: r.avatar_url ?? null,
    count: Number(r.c ?? 0),
  }));
}

export async function getEngagementTotals(days: number) {
  const [[r]] = await db.query<any[]>(
    `SELECT
        SUM(s.likes) l, SUM(s.comments) c,
        SUM(s.views) v, SUM(s.shares) sh
     FROM post_metric_snapshots s
     INNER JOIN (
        SELECT post_id, MAX(fetched_at) AS f
        FROM post_metric_snapshots
        GROUP BY post_id
     ) latest ON latest.post_id = s.post_id AND latest.f = s.fetched_at
     INNER JOIN generated_content g ON g.id = s.post_id
     WHERE g.status = 'posted'
       AND g.posted_at >= NOW() - INTERVAL ? DAY`,
    [days],
  );
  return {
    likes: Number(r?.l ?? 0), comments: Number(r?.c ?? 0),
    views: Number(r?.v ?? 0), shares: Number(r?.sh ?? 0),
  };
}
