import { db } from "./db";

const BASE_SQL = `
  SELECT 'user_signup' AS type, id AS user_id, NULL AS detail, created_at AS at FROM users
  UNION ALL
  SELECT 'post_generated', user_id, platform, created_at FROM generated_content
  UNION ALL
  SELECT 'post_published', user_id, platform, posted_at
    FROM posting_history WHERE status='success' AND posted_at IS NOT NULL
  UNION ALL
  SELECT 'post_failed', user_id, platform, created_at
    FROM posting_history WHERE status='failed'
  UNION ALL
  SELECT 'subscription_started', user_id, plan_tier, created_at FROM subscriptions
  UNION ALL
  SELECT 'subscription_canceled', user_id, plan_tier, canceled_at
    FROM subscriptions WHERE canceled_at IS NOT NULL
  UNION ALL
  SELECT 'ticket_opened', user_id, subject, created_at FROM support_tickets
  UNION ALL
  SELECT 'feedback_submitted', user_id, category, created_at FROM feedback
`;

export type ActivityRow = {
  type: string;
  at: string;
  detail: string | null;
  actor:
    | { id: string; email: string; firstName: string; lastName: string; avatarUrl: string | null }
    | null;
};

export async function fetchActivity(limit: number, type?: string): Promise<ActivityRow[]> {
  const where = type ? "WHERE e.type = ?" : "";
  const sql = `
    SELECT e.*, u.email, u.first_name, u.last_name, p.avatar_url
    FROM (${BASE_SQL}) e
    LEFT JOIN users u ON u.id = e.user_id
    LEFT JOIN user_profiles p ON p.user_id = e.user_id
    ${where}
    ORDER BY e.at DESC
    LIMIT ?`;
  const params = type ? [type, limit] : [limit];
  const [rows] = await db.query<any[]>(sql, params);
  return rows.map((r) => ({
    type: r.type,
    at: r.at instanceof Date ? r.at.toISOString() : String(r.at),
    detail: r.detail ?? null,
    actor: r.user_id
      ? {
          id: r.user_id, email: r.email,
          firstName: r.first_name, lastName: r.last_name,
          avatarUrl: r.avatar_url ?? null,
        }
      : null,
  }));
}
