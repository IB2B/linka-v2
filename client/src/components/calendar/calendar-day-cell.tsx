"use client";

import { CalendarPostChip } from "./calendar-post-chip";
import { cn } from "@/lib/utils";
import type { CalendarDay } from "@/types/calendar";

const MAX_VISIBLE = 3;

export function CalendarDayCell({ day }: { day: CalendarDay }) {
  const visible = day.posts.slice(0, MAX_VISIBLE);
  const overflow = day.posts.length - visible.length;
  const dow = day.date.getDay();
  const isWeekend = dow === 0 || dow === 6;
  return (
    <div
      className={cn(
        "relative flex min-h-[110px] flex-col gap-1 border-r border-b p-1.5 transition-colors last:border-r-0",
        !day.inMonth && "text-muted-foreground/50",
        day.inMonth && isWeekend && !day.isToday && "bg-weekend-tint/60",
        day.isToday && "bg-brand-soft",
      )}
    >
      <div className="flex items-center justify-between px-1">
        <span
          className={cn(
            "text-xs font-medium tabular-nums",
            day.isToday &&
              "inline-flex size-5 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-sm",
          )}
        >
          {day.date.getDate()}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        {visible.map((post) => (
          <CalendarPostChip key={post.id} post={post} />
        ))}
        {overflow > 0 ? (
          <span className="px-1 text-[11px] text-muted-foreground">
            +{overflow} more
          </span>
        ) : null}
      </div>
    </div>
  );
}
