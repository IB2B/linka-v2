import type { Notification } from "./notifications-data";

const DAY = 24 * 60 * 60 * 1000;

export type NotificationGroup = { label: string; items: Notification[] };

export function groupByDate(list: Notification[]): NotificationGroup[] {
  const todayUtc = new Date();
  todayUtc.setUTCHours(0, 0, 0, 0);
  const yesterdayUtc = todayUtc.getTime() - DAY;
  const groups: Record<string, Notification[]> = { Today: [], Yesterday: [], Earlier: [] };
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
