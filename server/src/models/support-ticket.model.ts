import { randomUUID } from "node:crypto";
import { db } from "../lib/db";
import type { SupportTicket, TicketStatus, TicketPriority } from "../types/support";

const COLS = "id, user_id, subject, body, status, priority, category, created_at, updated_at, closed_at";

function map(r: any): SupportTicket {
  return {
    id: r.id, userId: r.user_id, subject: r.subject, body: r.body,
    status: r.status, priority: r.priority, category: r.category,
    createdAt: new Date(r.created_at).toISOString(),
    updatedAt: new Date(r.updated_at).toISOString(),
    closedAt: r.closed_at ? new Date(r.closed_at).toISOString() : null,
  };
}

export async function listByUser(userId: string): Promise<SupportTicket[]> {
  const [rows] = await db.query<any[]>(
    `SELECT ${COLS} FROM support_tickets WHERE user_id = ? ORDER BY updated_at DESC`, [userId],
  );
  return rows.map(map);
}

export async function listAll(): Promise<SupportTicket[]> {
  const [rows] = await db.query<any[]>(
    `SELECT ${COLS} FROM support_tickets
     ORDER BY CASE status WHEN 'open' THEN 0 WHEN 'pending' THEN 1 ELSE 2 END,
              FIELD(priority, 'urgent','high','normal','low'),
              updated_at DESC`,
  );
  return rows.map(map);
}

export async function getById(id: string): Promise<SupportTicket | null> {
  const [rows] = await db.query<any[]>(`SELECT ${COLS} FROM support_tickets WHERE id = ?`, [id]);
  return rows[0] ? map(rows[0]) : null;
}

export async function insertOne(
  userId: string, subject: string, body: string,
  priority: TicketPriority, category: string | null,
): Promise<SupportTicket> {
  const id = randomUUID();
  await db.query(
    `INSERT INTO support_tickets (id, user_id, subject, body, priority, category)
     VALUES (?,?,?,?,?,?)`,
    [id, userId, subject, body, priority, category],
  );
  return (await getById(id))!;
}

export async function updateStatus(id: string, status: TicketStatus): Promise<void> {
  const closing = status === "closed" || status === "resolved";
  await db.query(
    `UPDATE support_tickets SET status = ?, closed_at = ${closing ? "NOW(3)" : "NULL"}
     WHERE id = ?`, [status, id],
  );
}
