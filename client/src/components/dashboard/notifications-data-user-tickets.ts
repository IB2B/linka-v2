import type { Notification } from "./notifications-data";

export type UserTicketApiItem = {
  id: string;
  subject: string;
  status: "resolved" | "closed";
  closedAt: string;
  seenAt: string | null;
};

export function buildUserTicketNotifications(
  items: UserTicketApiItem[], prefix: string,
): Notification[] {
  return items.map((t) => ({
    id: `ticket-${t.id}`,
    kind: "ticket",
    title: t.status === "closed" ? "Ticket closed" : "Ticket resolved",
    body: t.subject,
    href: `${prefix}/support/${t.id}`,
    at: t.closedAt,
    seen: t.seenAt !== null,
  }));
}
