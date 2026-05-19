import type { RowDataPacket } from "mysql2";
import { db } from "./db";
import { sendEmail } from "./email/send";
import { supportTicketResolvedEmail } from "./email/templates/support-ticket-resolved";

interface Row extends RowDataPacket {
  email: string;
  first_name: string;
  subject: string;
}

export async function notifyUserOfTicketStatus(
  ticketId: string, status: "resolved" | "closed",
): Promise<void> {
  if (!process.env.SMTP_HOST) return;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const [rows] = await db.query<Row[]>(
    `SELECT u.email, u.first_name, t.subject
     FROM support_tickets t JOIN users u ON u.id = t.user_id
     WHERE t.id = ? LIMIT 1`,
    [ticketId],
  );
  const r = rows[0];
  if (!r) return;
  const { subject, html } = supportTicketResolvedEmail({
    firstName: r.first_name, ticketId, subject: r.subject, status, appUrl,
  });
  await sendEmail({ to: r.email, subject, html });
}
