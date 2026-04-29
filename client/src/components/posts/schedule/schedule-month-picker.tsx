"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScheduleMonthDay } from "./schedule-month-day";
import { buildMonth } from "@/lib/calendar/build-month";
import { dateKey, monthLabel } from "@/lib/calendar/format";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type Props = {
  selected: Date;
  onSelect: (date: Date) => void;
};

export function ScheduleMonthPicker({ selected, onSelect }: Props) {
  const [cursor, setCursor] = useState(
    () => new Date(selected.getFullYear(), selected.getMonth(), 1),
  );
  const days = useMemo(() => buildMonth(cursor, []), [cursor]);
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const selectedKey = dateKey(selected);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold tracking-tight">
          {monthLabel(cursor)}
        </h3>
        <div className="flex gap-1">
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="size-7 p-0"
            onClick={() =>
              setCursor((c) => new Date(c.getFullYear(), c.getMonth() - 1, 1))
            }
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="size-7 p-0"
            onClick={() =>
              setCursor((c) => new Date(c.getFullYear(), c.getMonth() + 1, 1))
            }
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        {WEEKDAYS.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => (
          <ScheduleMonthDay
            key={day.key}
            day={day}
            selected={day.key === selectedKey}
            disabled={day.date < todayStart}
            hasPosts={day.isToday}
            onClick={() => onSelect(day.date)}
          />
        ))}
      </div>
    </div>
  );
}
