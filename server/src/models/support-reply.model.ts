import { randomUUID } from "node:crypto";
import { db } from "../lib/db";
import type { TicketReply } from "../types/support";

const COLS = "id, ticket_id, author_id, body, is_admin, created_at";

function map(r: any): TicketReply {
  return {
    id: r.id, ticketId: r.ticket_id, authorId: r.author_id,
    body: r.body, isAdmin: !!r.is_admin,
    createdAt: new Date(r.created_at).toISOString(),
  };
}

export async function listByTicket(ticketId: string): Promise<TicketReply[]> {
  const [rows] = await db.query<any[]>(
    `SELECT ${COLS} FROM support_ticket_replies WHERE ticket_id = ? ORDER BY created_at ASC`,
    [ticketId],
  );
  return rows.map(map);
}

export async function insertReply(
  ticketId: string, authorId: string, body: string, isAdmin: boolean,
): Promise<TicketReply> {
  const id = randomUUID();
  await db.query(
    `INSERT INTO support_ticket_replies (id, ticket_id, author_id, body, is_admin)
     VALUES (?,?,?,?,?)`, [id, ticketId, authorId, body, isAdmin],
  );
  await db.query("UPDATE support_tickets SET updated_at = NOW(3) WHERE id = ?", [ticketId]);
  const [rows] = await db.query<any[]>(`SELECT ${COLS} FROM support_ticket_replies WHERE id = ?`, [id]);
  return map(rows[0]);
}
