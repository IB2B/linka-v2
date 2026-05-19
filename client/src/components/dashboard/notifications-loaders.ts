import { buildNotifications, type Notification, type NotificationApiItem } from "./notifications-data";
import { buildAdminNotifications, type AdminNotificationApiItem } from "./notifications-data-admin";
import { buildUserTicketNotifications, type UserTicketApiItem } from "./notifications-data-user-tickets";
import { buildSocialNotifications, type SocialNotificationApiItem } from "./notifications-data-social";

async function jsonItems<T>(url: string): Promise<T[]> {
  try {
    const r = await fetch(url, { cache: "no-store" });
    if (!r.ok) return [];
    const d = await r.json();
    return (d.items ?? []) as T[];
  } catch { return []; }
}

export async function loadAdminNotifications(prefix: string): Promise<Notification[]> {
  const items = await jsonItems<AdminNotificationApiItem>("/api/admin/notifications");
  return buildAdminNotifications(items, prefix);
}

export async function loadUserNotifications(prefix: string): Promise<Notification[]> {
  const [posts, tickets, social] = await Promise.all([
    jsonItems<NotificationApiItem>("/api/posts/notifications"),
    jsonItems<UserTicketApiItem>("/api/support/notifications"),
    jsonItems<SocialNotificationApiItem>("/api/social/notifications"),
  ]);
  return [
    ...buildNotifications(posts, prefix),
    ...buildUserTicketNotifications(tickets, prefix),
    ...buildSocialNotifications(social, prefix),
  ].sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime());
}
