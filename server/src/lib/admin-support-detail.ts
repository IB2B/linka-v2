import { db } from "./db";

export type TicketReply = {
  id: string;
  body: string;
  attachmentUrl: string | null;
  isAdmin: boolean;
  createdAt: string;
  author: {
    id: string; email: string;
    firstName: string; lastName: string;
    avatarUrl: string | null;
  };
};

export async function getTicketDetail(id: string) {
  const [[t]] = await db.query<any[]>(
    `SELECT t.id, t.subject, t.body, t.attachment_url, t.status, t.priority, t.category,
            t.created_at, t.updated_at, t.closed_at,
            u.id u_id, u.email u_email, u.first_name u_fn, u.last_name u_ln,
            p.avatar_url u_av
     FROM support_tickets t
     INNER JOIN users u ON u.id = t.user_id
     LEFT JOIN user_profiles p ON p.user_id = u.id
     WHERE t.id = ? LIMIT 1`, [id],
  );
  if (!t) return null;

  const [replies] = await db.query<any[]>(
    `SELECT r.id, r.body, r.attachment_url, r.is_admin, r.created_at,
            u.id u_id, u.email u_email, u.first_name u_fn, u.last_name u_ln,
            p.avatar_url u_av
     FROM support_ticket_replies r
     INNER JOIN users u ON u.id = r.author_id
     LEFT JOIN user_profiles p ON p.user_id = u.id
     WHERE r.ticket_id = ?
     ORDER BY r.created_at ASC`, [id],
  );

  return {
    ticket: {
      id: t.id, subject: t.subject, body: String(t.body ?? ""),
      attachmentUrl: t.attachment_url ?? null,
      status: t.status, priority: t.priority, category: t.category ?? null,
      createdAt: new Date(t.created_at).toISOString(),
      updatedAt: new Date(t.updated_at).toISOString(),
      closedAt: t.closed_at ? new Date(t.closed_at).toISOString() : null,
      user: {
        id: t.u_id, email: t.u_email,
        firstName: t.u_fn, lastName: t.u_ln, avatarUrl: t.u_av ?? null,
      },
    },
    replies: replies.map<TicketReply>((r) => ({
      id: r.id, body: String(r.body ?? ""),
      attachmentUrl: r.attachment_url ?? null,
      isAdmin: Boolean(r.is_admin),
      createdAt: new Date(r.created_at).toISOString(),
      author: {
        id: r.u_id, email: r.u_email,
        firstName: r.u_fn, lastName: r.u_ln, avatarUrl: r.u_av ?? null,
      },
    })),
  };
}
