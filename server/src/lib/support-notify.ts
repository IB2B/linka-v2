import { db } from "./db";
import { sendEmail } from "./email/send";
import { supportTicketCreatedEmail } from "./email/templates/support-ticket-created";

type UserRow = { email: string; first_name: string; last_name: string };

type Input = {
  ticketId: string;
  userId: string;
  subject: string;
  body: string;
  category: string;
  priority: string;
};

export async function notifyAdminsOfNewTicket(input: Input): Promise<void> {
  const to = process.env.SUPPORT_NOTIFICATION_EMAIL ?? "med@intelligentb2b.com";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  if (!process.env.SMTP_HOST) return;
  const [rows] = await db.query<(UserRow & import("mysql2").RowDataPacket)[]>(
    "SELECT email, first_name, last_name FROM users WHERE id = ? LIMIT 1",
    [input.userId],
  );
  const u = rows[0];
  if (!u) return;
  const { subject, html } = supportTicketCreatedEmail({
    ticketId: input.ticketId,
    subject: input.subject,
    body: input.body,
    category: input.category,
    priority: input.priority,
    userEmail: u.email,
    userName: `${u.first_name} ${u.last_name}`.trim() || u.email,
    appUrl,
  });
  await sendEmail({ to, subject, html, replyTo: u.email });
}
