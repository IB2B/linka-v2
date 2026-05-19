import { emailLayout } from "./layout";

export type TicketResolvedInput = {
  firstName: string;
  ticketId: string;
  subject: string;
  status: "resolved" | "closed";
  appUrl: string;
};

export function supportTicketResolvedEmail(input: TicketResolvedInput) {
  const { firstName, ticketId, subject, status, appUrl } = input;
  const name = firstName?.trim() || "there";
  const link = `${appUrl.replace(/\/$/, "")}/dashboard/support/${ticketId}`;
  const verb = status === "closed" ? "closed" : "marked as resolved";
  const heading = status === "closed" ? "Ticket closed" : "Ticket resolved";
  const followup = status === "closed"
    ? "If something still isn&rsquo;t right, just reply to this email — we&rsquo;ll reopen it."
    : "If anything is still off, hit reply or reopen the ticket and we&rsquo;ll take another look.";
  const body = `
    <p>Hey ${escape(name)},</p>
    <p>Your ticket <strong>"${escape(subject)}"</strong> was just ${verb}.</p>
    <p style="margin:24px 0">
      <a class="btn" href="${link}">View ticket</a>
    </p>
    <p class="small">${followup}</p>
  `;
  return {
    subject: `${heading} · ${subject}`,
    html: emailLayout({ preheader: `Your support ticket has been ${verb}.`, heading, body }),
  };
}

function escape(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}
