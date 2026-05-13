export type NotificationKind = "failed" | "upcoming" | "posted";

export type Notification = {
  id: string;
  kind: NotificationKind;
  title: string;
  body: string;
  href: string;
  at: string;
};

export type NotificationFilter = "all" | "failed" | "upcoming";

export type NotificationApiItem = {
  id: string;
  content: string;
  status: "failed" | "scheduled";
  scheduledFor: string | null;
  postedAt: string | null;
  createdAt: string;
};

function preview(s: string, n = 70): string {
  return s.length > n ? `${s.slice(0, n)}…` : s;
}

export function buildNotifications(
  items: NotificationApiItem[], prefix: string,
): Notification[] {
  const out: Notification[] = [];
  for (const p of items) {
    if (p.status === "failed") {
      out.push({ id: `fail-${p.id}`, kind: "failed", title: "Post failed to publish",
        body: preview(p.content), href: `${prefix}/posts/${p.id}`, at: p.postedAt ?? p.createdAt });
    } else if (p.status === "scheduled" && p.scheduledFor) {
      out.push({ id: `up-${p.id}`, kind: "upcoming", title: "Going live within 24h",
        body: preview(p.content), href: `${prefix}/posts/${p.id}`, at: p.scheduledFor });
    }
  }
  return out.sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime());
}

export function filterNotifications(list: Notification[], filter: NotificationFilter): Notification[] {
  if (filter === "all") return list;
  return list.filter((n) => n.kind === filter);
}

export type { NotificationGroup } from "./notifications-group";
export { groupByDate } from "./notifications-group";
