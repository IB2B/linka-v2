import type { CalendarDay } from "@/types/calendar";
import type { GeneratedPost } from "@/types/post";
import { dateKey } from "./format";
import { groupPostsByDay } from "./group-posts";

const WEEKS = 6;
const DAYS_PER_WEEK = 7;

export function buildMonth(
  cursor: Date,
  posts: GeneratedPost[],
): CalendarDay[] {
  const grouped = groupPostsByDay(posts);
  const todayKey = dateKey(new Date());
  const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
  const start = new Date(first);
  start.setDate(1 - first.getDay());

  const days: CalendarDay[] = [];
  for (let i = 0; i < WEEKS * DAYS_PER_WEEK; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const key = dateKey(d);
    days.push({
      date: d,
      key,
      inMonth: d.getMonth() === cursor.getMonth(),
      isToday: key === todayKey,
      posts: grouped.get(key) ?? [],
    });
  }
  return days;
}
