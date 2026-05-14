import { db } from "./db";
import { monthRange } from "./month-range";

export async function fetchUserDetail(id: string, month?: string) {
  const [[u]] = await db.query<any[]>(
    `SELECT u.id, u.email, u.first_name, u.last_name, u.role, u.status, u.created_at,
            p.industry, p.bio, p.job_title, p.avatar_url, s.plan_tier, s.status AS sub_status,
            s.current_period_end, s.canceled_at
       FROM users u
       LEFT JOIN user_profiles p ON p.user_id = u.id
       LEFT JOIN subscriptions s ON s.user_id = u.id
      WHERE u.id = ?`, [id],
  );
  if (!u) return null;

  const range = monthRange(month);
  const dateWhere = range ? "AND created_at >= ? AND created_at < ?" : "";
  const dateParams = range ? [range[0], range[1]] : [];

  const [[c]] = await db.query<any[]>(
    `SELECT
       (SELECT COUNT(*) FROM generated_content WHERE user_id = ? ${dateWhere}) AS generated,
       (SELECT COUNT(*) FROM posting_history WHERE user_id = ? AND status='success' ${dateWhere}) AS published,
       (SELECT COUNT(*) FROM posting_history WHERE user_id = ? AND status='failed' ${dateWhere}) AS failed,
       (SELECT COUNT(*) FROM generated_content WHERE user_id = ?
          AND created_at >= NOW() - INTERVAL 30 DAY) AS last30d`,
    [id, ...dateParams, id, ...dateParams, id, ...dateParams, id],
  );

  const actWhere = range ? "AND e.at >= ? AND e.at < ?" : "";
  const [acts] = await db.query<any[]>(
    `SELECT * FROM (
       SELECT 'post_generated' AS type, platform AS detail, created_at AS at
         FROM generated_content WHERE user_id = ?
       UNION ALL
       SELECT 'post_published', platform, posted_at FROM posting_history
         WHERE user_id = ? AND status='success' AND posted_at IS NOT NULL
       UNION ALL
       SELECT 'post_failed', platform, created_at FROM posting_history
         WHERE user_id = ? AND status='failed'
       UNION ALL
       SELECT 'subscription_started', plan_tier, created_at
         FROM subscriptions WHERE user_id = ?
       UNION ALL
       SELECT 'ticket_opened', subject, created_at FROM support_tickets WHERE user_id = ?
       UNION ALL
       SELECT 'feedback_submitted', category, created_at FROM feedback WHERE user_id = ?
     ) e WHERE 1=1 ${actWhere} ORDER BY e.at DESC LIMIT 20`,
    range
      ? [id, id, id, id, id, id, range[0], range[1]]
      : [id, id, id, id, id, id],
  );

  const [plats] = await db.query<any[]>(
    "SELECT DISTINCT platform FROM posting_history WHERE user_id = ? AND platform IS NOT NULL", [id],
  );
  return { user: u, counts: c, activity: acts, platforms: plats.map((p) => p.platform) };
}
