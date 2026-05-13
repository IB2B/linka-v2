import { randomUUID } from "node:crypto";
import { db } from "./db";

export async function addAdminReply(
  ticketId: string, authorId: string, body: string, attachmentUrl?: string,
): Promise<string> {
  const [[t]] = await db.query<any[]>(
    `SELECT id FROM support_tickets WHERE id = ? LIMIT 1`, [ticketId],
  );
  if (!t) throw Object.assign(new Error("Not found"), { status: 404 });
  const id = randomUUID();
  await db.query(
    `INSERT INTO support_ticket_replies
      (id, ticket_id, author_id, body, attachment_url, is_admin)
     VALUES (?, ?, ?, ?, ?, TRUE)`,
    [id, ticketId, authorId, body, attachmentUrl ?? null],
  );
  await db.query(
    `UPDATE support_tickets
     SET status = IF(status IN ('resolved','closed'),'pending',status),
         closed_at = IF(status='closed', NULL, closed_at)
     WHERE id = ?`, [ticketId],
  );
  return id;
}
