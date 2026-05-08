import type { ActivityEvent } from "@/types/admin";

export type EventGroup = { label: string; events: ActivityEvent[] };

function startOfDay(d: Date): number {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
}

export function groupEventsByDate(events: ActivityEvent[]): EventGroup[] {
  const today = startOfDay(new Date());
  const day = 86_400_000;
  const groups = new Map<string, ActivityEvent[]>();

  for (const e of events) {
    const t = startOfDay(new Date(e.at));
    const diff = Math.round((today - t) / day);
    let label: string;
    if (diff <= 0) label = "Today";
    else if (diff === 1) label = "Yesterday";
    else if (diff <= 7) label = "Earlier this week";
    else if (diff <= 30) label = "Earlier this month";
    else label = "Older";
    if (!groups.has(label)) groups.set(label, []);
    groups.get(label)!.push(e);
  }
  return Array.from(groups, ([label, events]) => ({ label, events }));
}
