import { db } from "./db";
import { orderBy, type SortKey, type SortDir } from "./admin-users-sort";

export type ListFilters = {
  q?: string; role?: string; status?: string;
  sort?: SortKey; dir?: SortDir;
  limit: number; offset: number;
};

function pickLastActive(a: Date | null, b: Date | null): string | null {
  const at = a ? a.getTime() : 0;
  const bt = b ? b.getTime() : 0;
  if (!at && !bt) return null;
  return new Date(Math.max(at, bt)).toISOString();
}

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

  const [rows] = await db.query<any[]>(
    `SELECT u.id, u.email, u.first_name, u.last_name, u.role, u.status,
            u.created_at, s.plan_tier, p.avatar_url, p.industry,
            COALESCE(g.posts_count, 0) AS posts_count,
            g.last_gen, ph.last_post
     FROM users u
     LEFT JOIN subscriptions s ON s.user_id = u.id
     LEFT JOIN user_profiles p ON p.user_id = u.id
     LEFT JOIN (
       SELECT user_id, COUNT(*) AS posts_count, MAX(created_at) AS last_gen
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
  );
  const [[c]] = await db.query<any[]>(
    `SELECT COUNT(*) AS total FROM users u ${where}`, params,
  );
  return {
    users: rows.map((r) => ({
      id: r.id, email: r.email,
      firstName: r.first_name, lastName: r.last_name,
      role: r.role, status: r.status,
      createdAt: r.created_at, planTier: r.plan_tier ?? "free",
      avatarUrl: r.avatar_url ?? null,
      industry: r.industry ?? null,
      postsCount: Number(r.posts_count ?? 0),
      lastActiveAt: pickLastActive(r.last_gen, r.last_post),
    })),
    total: Number(c.total ?? 0),
  };
}
