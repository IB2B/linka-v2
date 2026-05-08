import { db } from "./db";

export type ActivityWindow = { curr: number; prev: number };
export type ActivitySummary = {
  events: ActivityWindow;
  signups: ActivityWindow;
  posts: ActivityWindow;
  failures: ActivityWindow;
  byType: Record<string, number>;
};

const SQL = `
  SELECT type,
    SUM(at >= NOW() - INTERVAL 1 DAY)                                AS curr,
    SUM(at >= NOW() - INTERVAL 2 DAY AND at < NOW() - INTERVAL 1 DAY) AS prev
  FROM (
    SELECT 'user_signup' AS type, created_at AS at FROM users
    UNION ALL SELECT 'post_generated', created_at FROM generated_content
    UNION ALL SELECT 'post_published', posted_at FROM posting_history
      WHERE status='success' AND posted_at IS NOT NULL
    UNION ALL SELECT 'post_failed', created_at FROM posting_history WHERE status='failed'
    UNION ALL SELECT 'subscription_started', created_at FROM subscriptions
    UNION ALL SELECT 'subscription_canceled', canceled_at FROM subscriptions
      WHERE canceled_at IS NOT NULL
    UNION ALL SELECT 'ticket_opened', created_at FROM support_tickets
    UNION ALL SELECT 'feedback_submitted', created_at FROM feedback
  ) e
  WHERE at >= NOW() - INTERVAL 2 DAY
  GROUP BY type
`;

const POST_TYPES = ["post_generated", "post_published"];

function sumWindow(map: Map<string, ActivityWindow>, keys: string[]): ActivityWindow {
  return keys.reduce<ActivityWindow>(
    (acc, k) => {
      const w = map.get(k);
      return { curr: acc.curr + (w?.curr ?? 0), prev: acc.prev + (w?.prev ?? 0) };
    },
    { curr: 0, prev: 0 },
  );
}

export async function fetchActivitySummary(): Promise<ActivitySummary> {
  const [rows] = await db.query<any[]>(SQL);
  const map = new Map<string, ActivityWindow>();
  const byType: Record<string, number> = {};
  for (const r of rows) {
    const w = { curr: Number(r.curr), prev: Number(r.prev) };
    map.set(r.type, w);
    byType[r.type] = w.curr;
  }
  const allKeys = Array.from(map.keys());
  return {
    events:   sumWindow(map, allKeys),
    signups:  sumWindow(map, ["user_signup"]),
    posts:    sumWindow(map, POST_TYPES),
    failures: sumWindow(map, ["post_failed"]),
    byType,
  };
}
