import { emailLayout } from "./layout";

export type TicketCreatedInput = {
  ticketId: string;
  subject: string;
  body: string;
  category: string;
  priority: string;
  userEmail: string;
  userName: string;
  appUrl: string;
};

export function supportTicketCreatedEmail(input: TicketCreatedInput) {
  const { ticketId, subject, body, category, priority, userEmail, userName, appUrl } = input;
  const link = `${appUrl.replace(/\/$/, "")}/admin/support/${ticketId}`;
  const html = `
    <p>A new support ticket was just opened.</p>
    <p style="margin:24px 0">
      <strong>${escape(subject)}</strong><br />
      <span class="small">${escape(category)} · ${escape(priority)} priority</span>
    </p>
    <p class="small" style="white-space:pre-wrap;background:#FAFAFA;border:1px solid #F4F4F5;border-radius:6px;padding:14px 16px">${escape(body)}</p>
    <p class="small">From <strong>${escape(userName)}</strong> &lt;${escape(userEmail)}&gt;</p>
    <p style="margin:32px 0">
      <a class="btn" href="${link}">Open ticket</a>
    </p>
  `;
  return {
    subject: `[Support] ${subject}`,
    html: emailLayout({
      preheader: `${priority} priority · from ${userName}`,
      heading: "New support ticket",
      body: html,
    }),
  };
}

function escape(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}
