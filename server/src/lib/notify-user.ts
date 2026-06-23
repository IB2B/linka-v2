import type { RowDataPacket } from "mysql2";
import { db } from "./db";
import { sendEmail } from "./email/send";

type PrefKey =
  | "notif_published" | "notif_failed" | "notif_limit" | "notif_generated";

type Row = RowDataPacket & {
  email: string;
  first_name: string;
  notif_published: 0 | 1;
  notif_failed: 0 | 1;
  notif_limit: 0 | 1;
  notif_generated: 0 | 1;
};

type Mail = { subject: string; html: string };

export async function notifyUserIfEnabled(
  userId: string, pref: PrefKey, build: (firstName: string) => Mail,
): Promise<void> {
  const [rows] = await db.query<Row[]>(
    `SELECT email, first_name, notif_published, notif_failed, notif_limit,
            notif_generated
     FROM users WHERE id = ? LIMIT 1`,
    [userId],
  );
  const u = rows[0];
  if (!u) return;
  if (!u[pref]) return;
  const mail = build(u.first_name);
  await sendEmail({ to: u.email, subject: mail.subject, html: mail.html });
}
