import { db } from "./db";

export async function getTicketWithReplies(ticketId: string, userId: string) {
  const [[t]] = await db.query<any[]>(
    `SELECT id, subject, body, attachment_url, status, priority, category, rating,
            created_at, updated_at, closed_at
     FROM support_tickets WHERE id = ? AND user_id = ? LIMIT 1`,
    [ticketId, userId],
  );
  if (!t) return null;
  const [replies] = await db.query<any[]>(
    `SELECT r.id, r.body, r.attachment_url, r.is_admin, r.created_at,
            u.first_name, u.last_name, u.email, p.avatar_url
     FROM support_ticket_replies r
     INNER JOIN users u ON u.id = r.author_id
     LEFT JOIN user_profiles p ON p.user_id = u.id
     WHERE r.ticket_id = ? ORDER BY r.created_at ASC`,
    [ticketId],
  );
  return {
    ticket: {
      id: t.id, subject: t.subject, body: t.body,
      attachmentUrl: t.attachment_url ?? null,
      status: t.status, priority: t.priority, category: t.category ?? null,
      rating: t.rating ?? null,
      createdAt: new Date(t.created_at).toISOString(),
      updatedAt: new Date(t.updated_at).toISOString(),
      closedAt: t.closed_at ? new Date(t.closed_at).toISOString() : null,
    },
    replies: (replies as any[]).map((r) => ({
      id: r.id, body: r.body, attachmentUrl: r.attachment_url ?? null,
      isAdmin: Boolean(r.is_admin),
      createdAt: new Date(r.created_at).toISOString(),
      author: {
        firstName: r.first_name, lastName: r.last_name,
        email: r.email, avatarUrl: r.avatar_url ?? null,
      },
    })),
  };
}
