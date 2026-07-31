import type { Platform } from "@/lib/zernio/zernio-account.types";

export type NotificationKind =
  | "failed" | "upcoming" | "posted" | "ticket" | "likes" | "comments" | "generated";

export type NotificationPriority = "urgent" | "high" | "normal" | "low";

export type Notification = {
  id: string;
  kind: NotificationKind;
  title: string;
  body: string;
  href: string;
  at: string;
  seen?: boolean;
  priority?: NotificationPriority;
  avatarLabel?: string;
  platform?: Platform;
};

export type NotificationApiItem = {
  id: string;
  content: string;
  status: "failed" | "scheduled" | "draft";
  scheduledFor: string | null;
  postedAt: string | null;
  createdAt: string;
  seen?: boolean;
};

function preview(s: string, n = 70): string {
  return s.length > n ? `${s.slice(0, n)}…` : s;
}

export function buildNotifications(
  items: NotificationApiItem[], prefix: string,
): Notification[] {
  const out: Notification[] = [];
  for (const p of items) {
    const base = { body: preview(p.content), href: `${prefix}/posts/${p.id}`, seen: p.seen };
    if (p.status === "failed") {
      out.push({ ...base, id: `fail-${p.id}`, kind: "failed",
        title: "Post failed to publish", at: p.postedAt ?? p.createdAt });
    } else if (p.status === "scheduled" && p.scheduledFor) {
      out.push({ ...base, id: `up-${p.id}`, kind: "upcoming",
        title: "Going live within 24h", at: p.scheduledFor });
    } else if (p.status === "draft") {
      out.push({ ...base, id: `gen-${p.id}`, kind: "generated",
        title: "Post ready to review", at: p.createdAt });
    }
  }
  return out.sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime());
}

export type { NotificationGroup } from "./notifications-group";
export { groupByDate } from "./notifications-group";
