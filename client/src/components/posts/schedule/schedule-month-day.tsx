"use client";

import { cn } from "@/lib/utils";
import type { CalendarDay } from "@/types/calendar";

type Props = {
  day: CalendarDay;
  selected: boolean;
  disabled: boolean;
  hasPosts: boolean;
  onClick: () => void;
};

export function ScheduleMonthDay({
  day,
  selected,
  disabled,
  hasPosts,
  onClick,
}: Props) {
  const isNextMonth = !day.inMonth && day.date > new Date();
  const monthLabel = day.date.toLocaleString("en-US", { month: "short" }).toUpperCase();
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "relative flex h-9 flex-col items-center justify-center rounded-md text-sm transition-colors",
        disabled && "cursor-not-allowed text-muted-foreground/40",
        !disabled && !selected && "hover:bg-muted",
        selected && "bg-foreground text-background",
        !day.inMonth && !selected && "border bg-muted/40",
      )}
    >
      {isNextMonth && day.date.getDate() === 1 ? (
        <span className="text-[10px] leading-none text-muted-foreground">
          {monthLabel}
        </span>
      ) : null}
      <span className="leading-none">{day.date.getDate()}</span>
      {hasPosts && !selected ? (
        <span className="absolute bottom-1 size-1 rounded-full bg-foreground/70" />
      ) : null}
    </button>
  );
}
