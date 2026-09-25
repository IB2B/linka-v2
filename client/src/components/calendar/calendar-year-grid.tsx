"use client";

import { useMemo } from "react";

import { CalendarMiniMonth } from "./calendar-mini-month";
import { buildMonth } from "@/lib/calendar/build-month";
import type { GeneratedPost } from "@/types/post";

type Props = {
  year: number;
  posts: GeneratedPost[];
  onOpenMonth: (month: Date) => void;
  onOpenDay: (date: Date) => void;
};

const monthName = new Intl.DateTimeFormat("en-US", { month: "long" });

export function CalendarYearGrid({ year, posts, onOpenMonth, onOpenDay }: Props) {
  const months = useMemo(
    () => Array.from({ length: 12 }, (_, m) => {
      const first = new Date(year, m, 1);
      return { first, label: monthName.format(first), days: buildMonth(first, posts) };
    }),
    [year, posts],
  );
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {months.map((m) => (
        <CalendarMiniMonth key={m.label} label={m.label} days={m.days}
          onOpenMonth={() => onOpenMonth(m.first)} onOpenDay={onOpenDay} />
      ))}
    </div>
  );
}
