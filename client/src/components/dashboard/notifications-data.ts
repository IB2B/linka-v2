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

const DAY = 24 * 60 * 60 * 1000;

function preview(s: string, n = 70): string {
  return s.length > n ? `${s.slice(0, n)}…` : s;
}

export function buildNotifications(
  items: NotificationApiItem[], prefix: string,
): Notification[] {
  const out: Notification[] = [];
  for (const p of items) {
    if (p.status === "failed") {
      out.push({
        id: `fail-${p.id}`, kind: "failed",
        title: "Post failed to publish",
        body: preview(p.content),
        href: `${prefix}/posts/${p.id}`,
        at: p.postedAt ?? p.createdAt,
      });
    } else if (p.status === "scheduled" && p.scheduledFor) {
      out.push({
        id: `up-${p.id}`, kind: "upcoming",
        title: "Going live within 24h",
        body: preview(p.content),
        href: `${prefix}/posts/${p.id}`,
        at: p.scheduledFor,
      });
    }
  }
  return out.sort((a, b) =>
    new Date(b.at).getTime() - new Date(a.at).getTime(),
  );
}

export function filterNotifications(
  list: Notification[], filter: NotificationFilter,
): Notification[] {
  if (filter === "all") return list;
  return list.filter((n) => n.kind === filter);
}

export type NotificationGroup = { label: string; items: Notification[] };

export function groupByDate(list: Notification[]): NotificationGroup[] {
  const todayUtc = new Date();
  todayUtc.setUTCHours(0, 0, 0, 0);
  const yesterdayUtc = todayUtc.getTime() - DAY;
  const groups: Record<string, Notification[]> = {
    Today: [], Yesterday: [], Earlier: [],
  };
  for (const n of list) {
    const t = new Date(n.at).getTime();
    if (t >= todayUtc.getTime()) groups.Today.push(n);
    else if (t >= yesterdayUtc) groups.Yesterday.push(n);
    else groups.Earlier.push(n);
  }
  return (["Today", "Yesterday", "Earlier"] as const)
    .filter((k) => groups[k].length > 0)
    .map((k) => ({ label: k, items: groups[k] }));
}
