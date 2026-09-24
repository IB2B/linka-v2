"use client";

import { CalendarDayCell } from "./calendar-day-cell";
import { CalendarWeekdayRow } from "./calendar-weekday-row";
import type { CalendarDay } from "@/types/calendar";

type Props = {
  days: CalendarDay[];
  onOpenDay: (date: Date) => void;
  // Week view: one row of tall cells that show every post.
  week?: boolean;
};

export function CalendarGrid({ days, onOpenDay, week }: Props) {
  return (
    <div className="overflow-x-auto rounded-md border bg-card">
      <div className={week ? "min-w-[720px]" : undefined}>
        <CalendarWeekdayRow />
        <div className="grid grid-cols-7">
          {days.map((day) => (
            <CalendarDayCell key={day.key} day={day} onOpenDay={onOpenDay}
              maxVisible={week ? Infinity : 3} tall={week} />
          ))}
        </div>
      </div>
    </div>
  );
}
