import { getTransporter, emailFrom } from "./transporter";

export type EmailInput = {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
};

export type EmailResult = { messageId: string };

export async function sendEmail(input: EmailInput): Promise<EmailResult> {
  const info = await getTransporter().sendMail({
    from: emailFrom(),
    to: input.to,
    subject: input.subject,
    html: input.html,
    text: input.text ?? stripHtml(input.html),
    replyTo: input.replyTo,
  });
  return { messageId: info.messageId };
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}
