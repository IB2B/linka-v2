import type { Notification, NotificationPriority } from "./notifications-data";

export type AdminNotificationApiItem = {
  id: string;
  subject: string;
  priority: NotificationPriority;
  from: string;
  createdAt: string;
  seenAt: string | null;
};

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]![0]!.toUpperCase();
  return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
}

export function buildAdminNotifications(
  items: AdminNotificationApiItem[], prefix: string,
): Notification[] {
  return items.map((t) => ({
    id: `ticket-${t.id}`,
    kind: "ticket",
    title: t.from,
    body: t.subject,
    href: `${prefix}/support/${t.id}`,
    at: t.createdAt,
    seen: t.seenAt !== null,
    priority: t.priority,
    avatarLabel: initials(t.from),
  }));
}
