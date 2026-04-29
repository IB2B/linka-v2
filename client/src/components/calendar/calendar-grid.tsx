"use client";

import { CalendarDayCell } from "./calendar-day-cell";
import { CalendarWeekdayRow } from "./calendar-weekday-row";
import type { CalendarDay } from "@/types/calendar";

export function CalendarGrid({ days }: { days: CalendarDay[] }) {
  return (
    <div className="overflow-hidden rounded-md border bg-card">
      <CalendarWeekdayRow />
      <div className="grid grid-cols-7">
        {days.map((day) => (
          <CalendarDayCell key={day.key} day={day} />
        ))}
      </div>
    </div>
  );
}
