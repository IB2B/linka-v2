"use client";

import { cn } from "@/lib/utils";
import type { CalendarDay } from "@/types/calendar";

type Props = {
  label: string;
  days: CalendarDay[];
  onOpenMonth: () => void;
  onOpenDay: (date: Date) => void;
};

// One month of the year view: day numbers, tinted where posts exist.
export function CalendarMiniMonth({ label, days, onOpenMonth, onOpenDay }: Props) {
  const total = days.reduce((n, d) => n + (d.inMonth ? d.posts.length : 0), 0);
  return (
    <div className="rounded-md border bg-card p-3">
      <button type="button" onClick={onOpenMonth}
        className="mb-2 flex w-full items-baseline justify-between text-left hover:text-primary">
        <span className="text-sm font-semibold">{label}</span>
        <span className="text-xs text-muted-foreground">
          {total > 0 ? `${total} post${total === 1 ? "" : "s"}` : ""}
        </span>
      </button>
      <div className="grid grid-cols-7 gap-0.5 text-center">
        {days.map((d) => (
          <button key={d.key} type="button" disabled={!d.inMonth}
            onClick={() => onOpenDay(d.date)}
            title={d.posts.length ? `${d.posts.length} post${d.posts.length === 1 ? "" : "s"}` : undefined}
            className={cn(
              "aspect-square rounded text-[11px] tabular-nums transition",
              !d.inMonth && "invisible",
              d.inMonth && "hover:bg-muted",
              d.posts.length > 0 && "bg-brand-soft font-semibold text-foreground",
              d.isToday && "bg-brand text-brand-foreground hover:bg-brand",
            )}>
            {d.date.getDate()}
          </button>
        ))}
      </div>
    </div>
  );
}
