import type { CalendarViewMode } from "@/types/calendar";

const fmt = (opts: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("en-US", opts);

export function startOfWeek(d: Date): Date {
  const s = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  s.setDate(s.getDate() - s.getDay());
  return s;
}

// Moves the cursor one step of the current view: a day, a week, a month or a year.
export function shiftCursor(cursor: Date, view: CalendarViewMode, dir: 1 | -1): Date {
  const d = new Date(cursor);
  if (view === "day") d.setDate(d.getDate() + dir);
  else if (view === "week") d.setDate(d.getDate() + 7 * dir);
  else if (view === "month") return new Date(d.getFullYear(), d.getMonth() + dir, 1);
  else d.setFullYear(d.getFullYear() + dir);
  return d;
}

export function viewLabel(cursor: Date, view: CalendarViewMode): string {
  if (view === "day") return fmt({ weekday: "long", month: "long", day: "numeric", year: "numeric" }).format(cursor);
  if (view === "year") return String(cursor.getFullYear());
  if (view === "month") return fmt({ month: "long", year: "numeric" }).format(cursor);
  const start = startOfWeek(cursor);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  return fmt({ month: "short", day: "numeric", year: "numeric" }).formatRange(start, end);
}

export function isPastDay(d: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()) < today;
}
