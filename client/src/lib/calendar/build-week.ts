import type { CalendarDay } from "@/types/calendar";
import type { GeneratedPost } from "@/types/post";
import { dateKey } from "./format";
import { groupPostsByDay } from "./group-posts";
import { startOfWeek } from "./view-range";

// The seven days (Sunday first, like the month grid) of the cursor's week.
export function buildWeek(cursor: Date, posts: GeneratedPost[]): CalendarDay[] {
  const grouped = groupPostsByDay(posts);
  const todayKey = dateKey(new Date());
  const start = startOfWeek(cursor);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const key = dateKey(d);
    return { date: d, key, inMonth: true, isToday: key === todayKey, posts: grouped.get(key) ?? [] };
  });
}
