import { db } from "./db";

export type SupportFilters = {
  q?: string; status?: string; priority?: string; category?: string;
  limit: number; offset: number;
};

export type SupportRow = {
  id: string;
  subject: string;
  body: string;
  status: string;
  priority: string;
  category: string | null;
  createdAt: string;
  updatedAt: string;
  closedAt: string | null;
  replyCount: number;
  user: {
    id: string; email: string;
    firstName: string; lastName: string;
    avatarUrl: string | null;
  };
};

export async function listSupportTickets(f: SupportFilters) {
  const conds: string[] = []; const params: any[] = [];
  if (f.q) {
    conds.push("(t.subject LIKE ? OR t.body LIKE ? OR u.email LIKE ?)");
    params.push(`%${f.q}%`, `%${f.q}%`, `%${f.q}%`);
  }
  if (f.status) { conds.push("t.status = ?"); params.push(f.status); }
  if (f.priority) { conds.push("t.priority = ?"); params.push(f.priority); }
  if (f.category) { conds.push("t.category = ?"); params.push(f.category); }
  const where = conds.length ? `WHERE ${conds.join(" AND ")}` : "";

  const [rows] = await db.query<any[]>(
    `SELECT t.id, t.subject, t.body, t.status, t.priority, t.category,
            t.created_at, t.updated_at, t.closed_at,
            (SELECT COUNT(*) FROM support_ticket_replies r WHERE r.ticket_id = t.id) AS reply_count,
            u.id u_id, u.email u_email, u.first_name u_fn, u.last_name u_ln,
            p.avatar_url u_av
     FROM support_tickets t
     INNER JOIN users u ON u.id = t.user_id
     LEFT JOIN user_profiles p ON p.user_id = u.id
     ${where}
     ORDER BY FIELD(t.priority,'urgent','high','normal','low'),
              FIELD(t.status,'open','pending','resolved','closed'),
              t.created_at DESC
     LIMIT ? OFFSET ?`,
    [...params, f.limit, f.offset],
  );
  const [[c]] = await db.query<any[]>(
    `SELECT COUNT(*) AS total FROM support_tickets t
     INNER JOIN users u ON u.id = t.user_id ${where}`,
    params,
  );
  return {
    rows: rows.map<SupportRow>((r) => ({
      id: r.id, subject: r.subject, body: String(r.body ?? ""),
      status: r.status, priority: r.priority, category: r.category ?? null,
      createdAt: new Date(r.created_at).toISOString(),
      updatedAt: new Date(r.updated_at).toISOString(),
      closedAt: r.closed_at ? new Date(r.closed_at).toISOString() : null,
      replyCount: Number(r.reply_count ?? 0),
      user: {
        id: r.u_id, email: r.u_email,
        firstName: r.u_fn, lastName: r.u_ln,
        avatarUrl: r.u_av ?? null,
      },
    })),
    total: Number(c.total ?? 0),
  };
}
