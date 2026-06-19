import { db } from "./db";
import { orderBy, type SortKey, type SortDir } from "./admin-users-sort";
import { getPlanPrices } from "./stripe-plan-prices";
import { mapAdminUserRow } from "./admin-user-row-map";

export type ListFilters = {
  q?: string; role?: string; status?: string;
  sort?: SortKey; dir?: SortDir;
  limit: number; offset: number;
};

export async function listAdminUsers(f: ListFilters) {
  const conds: string[] = ["u.deleted_at IS NULL"];
  const params: any[] = [];
  if (f.q) {
    conds.push("(u.email LIKE ? OR CONCAT_WS(' ', u.first_name, u.last_name) LIKE ?)");
    params.push(`%${f.q}%`, `%${f.q}%`);
  }
  if (f.role) { conds.push("u.role = ?"); params.push(f.role); }
  if (f.status) { conds.push("u.status = ?"); params.push(f.status); }
  const where = `WHERE ${conds.join(" AND ")}`;

  const [rowsRes, countRes, prices] = await Promise.all([
    db.query<any[]>(
      `SELECT u.id, u.email, u.first_name, u.last_name, u.role, u.status,
              u.created_at, s.plan_tier, s.status AS sub_status, p.avatar_url, p.industry,
              g.posts_month, g.last_gen, ph.last_post
       FROM users u
       LEFT JOIN subscriptions s ON s.user_id = u.id
       LEFT JOIN user_profiles p ON p.user_id = u.id
       LEFT JOIN (
         SELECT user_id, MAX(created_at) AS last_gen,
                COUNT(CASE WHEN created_at >= DATE_FORMAT(NOW(), '%Y-%m-01 00:00:00') THEN 1 END) AS posts_month
         FROM generated_content GROUP BY user_id
       ) g ON g.user_id = u.id
       LEFT JOIN (
         SELECT user_id, MAX(posted_at) AS last_post
         FROM posting_history WHERE posted_at IS NOT NULL GROUP BY user_id
       ) ph ON ph.user_id = u.id
       ${where}
       ORDER BY ${orderBy(f.sort, f.dir)}
       LIMIT ? OFFSET ?`,
      [...params, f.limit, f.offset],
    ),
    db.query<any[]>(`SELECT COUNT(*) AS total FROM users u ${where}`, params),
    getPlanPrices().catch(() => ({})),
  ]);
  return {
    users: rowsRes[0].map((r) => mapAdminUserRow(r, prices)),
    total: Number(countRes[0][0]?.total ?? 0),
  };
}
