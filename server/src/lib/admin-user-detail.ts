import { db } from "./db";

const ACTIVITY_SQL = `
  SELECT * FROM (
    SELECT 'post_generated' AS type, platform AS detail, created_at AS at
      FROM generated_content WHERE user_id = ?
    UNION ALL
    SELECT 'post_published', platform, posted_at
      FROM posting_history WHERE user_id = ? AND status='success' AND posted_at IS NOT NULL
    UNION ALL
    SELECT 'post_failed', platform, created_at
      FROM posting_history WHERE user_id = ? AND status='failed'
    UNION ALL
    SELECT 'subscription_started', plan_tier, created_at
      FROM subscriptions WHERE user_id = ?
    UNION ALL
    SELECT 'ticket_opened', subject, created_at
      FROM support_tickets WHERE user_id = ?
    UNION ALL
    SELECT 'feedback_submitted', category, created_at
      FROM feedback WHERE user_id = ?
  ) e ORDER BY e.at DESC LIMIT 10
`;

export async function fetchUserDetail(id: string) {
  const [[u]] = await db.query<any[]>(
    `SELECT u.id, u.email, u.first_name, u.last_name, u.role, u.status, u.created_at,
            p.industry, p.bio, p.avatar_url, s.plan_tier, s.status AS sub_status,
            s.current_period_end, s.canceled_at
       FROM users u
       LEFT JOIN user_profiles p ON p.user_id = u.id
       LEFT JOIN subscriptions s ON s.user_id = u.id
      WHERE u.id = ?`, [id],
  );
  if (!u) return null;
  const [[c]] = await db.query<any[]>(
    `SELECT
       (SELECT COUNT(*) FROM generated_content WHERE user_id = ?)                             AS generated,
       (SELECT COUNT(*) FROM posting_history WHERE user_id = ? AND status='success')          AS published,
       (SELECT COUNT(*) FROM posting_history WHERE user_id = ? AND status='failed')           AS failed,
       (SELECT COUNT(*) FROM generated_content WHERE user_id = ?
          AND created_at >= NOW() - INTERVAL 30 DAY)                                          AS last30d`,
    [id, id, id, id],
  );
  const [acts] = await db.query<any[]>(ACTIVITY_SQL, [id, id, id, id, id, id]);
  const [plats] = await db.query<any[]>(
    "SELECT DISTINCT platform FROM posting_history WHERE user_id = ? AND platform IS NOT NULL", [id],
  );
  return { user: u, counts: c, activity: acts, platforms: plats.map((p) => p.platform) };
}
