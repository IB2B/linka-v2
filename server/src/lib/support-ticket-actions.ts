import { db } from "./db";

export async function resolveTicket(ticketId: string, userId: string): Promise<boolean> {
  const [r] = await db.query<any>(
    `UPDATE support_tickets SET status = 'resolved'
     WHERE id = ? AND user_id = ? AND status IN ('open','pending')`,
    [ticketId, userId],
  );
  return (r as any).affectedRows > 0;
}

export async function rateTicket(
  ticketId: string, userId: string, rating: number,
): Promise<boolean> {
  const [r] = await db.query<any>(
    `UPDATE support_tickets SET rating = ?
     WHERE id = ? AND user_id = ? AND status IN ('resolved','closed')`,
    [rating, ticketId, userId],
  );
  return (r as any).affectedRows > 0;
}

export async function markTicketViewed(ticketId: string, userId: string): Promise<void> {
  await db.query(
    `UPDATE support_tickets SET last_viewed_at = NOW(3) WHERE id = ? AND user_id = ?`,
    [ticketId, userId],
  );
}
