import { db } from "./db";

export type FeedbackFilters = {
  q?: string; category?: string; status?: string;
  limit: number; offset: number;
};

export type FeedbackRow = {
  id: string;
  category: string;
  status: string;
  message: string;
  pageUrl: string | null;
  userAgent: string | null;
  createdAt: string;
  user: {
    id: string | null; email: string | null;
    firstName: string | null; lastName: string | null;
    avatarUrl: string | null;
  } | null;
};

export async function listFeedback(f: FeedbackFilters) {
  const conds: string[] = []; const params: any[] = [];
  if (f.q) {
    conds.push("(fb.message LIKE ? OR u.email LIKE ?)");
    params.push(`%${f.q}%`, `%${f.q}%`);
  }
  if (f.category) { conds.push("fb.category = ?"); params.push(f.category); }
  if (f.status) { conds.push("fb.status = ?"); params.push(f.status); }
  const where = conds.length ? `WHERE ${conds.join(" AND ")}` : "";

  const [rows] = await db.query<any[]>(
    `SELECT fb.id, fb.category, fb.status, fb.message, fb.page_url, fb.user_agent, fb.created_at,
            u.id u_id, u.email u_email, u.first_name u_fn, u.last_name u_ln, p.avatar_url u_av
     FROM feedback fb
     LEFT JOIN users u ON u.id = fb.user_id
     LEFT JOIN user_profiles p ON p.user_id = u.id
     ${where}
     ORDER BY FIELD(fb.status,'new','triaged','closed'), fb.created_at DESC
     LIMIT ? OFFSET ?`,
    [...params, f.limit, f.offset],
  );
  const [[c]] = await db.query<any[]>(
    `SELECT COUNT(*) AS total FROM feedback fb
     LEFT JOIN users u ON u.id = fb.user_id ${where}`,
    params,
  );
  return {
    rows: rows.map<FeedbackRow>((r) => ({
      id: r.id, category: r.category, status: r.status,
      message: String(r.message ?? ""),
      pageUrl: r.page_url ?? null, userAgent: r.user_agent ?? null,
      createdAt: new Date(r.created_at).toISOString(),
      user: r.u_id ? {
        id: r.u_id, email: r.u_email,
        firstName: r.u_fn, lastName: r.u_ln, avatarUrl: r.u_av ?? null,
      } : null,
    })),
    total: Number(c.total ?? 0),
  };
}
