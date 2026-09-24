"use client";

import { CalendarPostChip } from "./calendar-post-chip";
import { CalendarAddButton } from "./calendar-add-button";
import { isPastDay } from "@/lib/calendar/view-range";
import { cn } from "@/lib/utils";
import type { CalendarDay } from "@/types/calendar";

type Props = {
  day: CalendarDay;
  onOpenDay: (date: Date) => void;
  maxVisible?: number;
  tall?: boolean;
};

export function CalendarDayCell({ day, onOpenDay, maxVisible = 3, tall }: Props) {
  const visible = day.posts.slice(0, maxVisible);
  const overflow = day.posts.length - visible.length;
  const dow = day.date.getDay();
  const isWeekend = dow === 0 || dow === 6;
  return (
    <div
      className={cn(
        "group/day relative flex flex-col gap-1 border-r border-b p-1.5 transition-colors last:border-r-0",
        tall ? "min-h-[320px]" : "min-h-[110px]",
        !day.inMonth && "text-muted-foreground/50",
        day.inMonth && isWeekend && !day.isToday && "bg-weekend-tint/60",
        day.isToday && "bg-brand-soft",
      )}
    >
      <div className="flex items-center justify-between px-1">
        <button
          type="button"
          onClick={() => onOpenDay(day.date)}
          title="Open this day"
          className={cn(
            "rounded-full text-xs font-medium tabular-nums hover:underline",
            day.isToday &&
              "inline-flex size-5 items-center justify-center bg-brand text-brand-foreground shadow-sm hover:no-underline",
          )}
        >
          {day.date.getDate()}
        </button>
        {!isPastDay(day.date) ? <CalendarAddButton dayKey={day.key} /> : null}
      </div>
      <div className="flex flex-col gap-1">
        {visible.map((post) => (
          <CalendarPostChip key={post.id} post={post} />
        ))}
        {overflow > 0 ? (
          <button type="button" onClick={() => onOpenDay(day.date)}
            className="px-1 text-left text-[11px] text-muted-foreground hover:text-foreground">
            +{overflow} more
          </button>
        ) : null}
      </div>
    </div>
  );
}
