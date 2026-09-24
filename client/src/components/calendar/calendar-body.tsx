"use client";

import { useMemo } from "react";

import { CalendarGrid } from "./calendar-grid";
import { CalendarDayView } from "./calendar-day-view";
import { CalendarYearGrid } from "./calendar-year-grid";
import { buildMonth } from "@/lib/calendar/build-month";
import { buildWeek } from "@/lib/calendar/build-week";
import { dateKey } from "@/lib/calendar/format";
import { groupPostsByDay } from "@/lib/calendar/group-posts";
import type { GeneratedPost } from "@/types/post";
import type { CalendarViewMode } from "@/types/calendar";

type Props = {
  view: CalendarViewMode;
  cursor: Date;
  posts: GeneratedPost[];
  onOpenDay: (date: Date) => void;
  onOpenMonth: (month: Date) => void;
};

export function CalendarBody({ view, cursor, posts, onOpenDay, onOpenMonth }: Props) {
  const days = useMemo(() => {
    if (view === "month") return buildMonth(new Date(cursor.getFullYear(), cursor.getMonth(), 1), posts);
    if (view === "week") return buildWeek(cursor, posts);
    return [];
  }, [view, cursor, posts]);

  if (view === "year") {
    return <CalendarYearGrid year={cursor.getFullYear()} posts={posts}
      onOpenMonth={onOpenMonth} onOpenDay={onOpenDay} />;
  }
  if (view === "day") {
    const dayPosts = groupPostsByDay(posts).get(dateKey(cursor)) ?? [];
    return <CalendarDayView date={cursor} posts={dayPosts} />;
  }
  return <CalendarGrid days={days} onOpenDay={onOpenDay} week={view === "week"} />;
}
