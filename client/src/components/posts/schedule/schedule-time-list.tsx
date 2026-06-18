"use client";

import { useMemo } from "react";

import { ScheduleTimeButton } from "./schedule-time-button";
import { ScheduleFormatToggle } from "./schedule-format-toggle";
import { buildTimeSlots, combineDateTime } from "@/lib/posts/schedule-times";
import { formatDayHeader, formatSlot, type TimeFormat } from "@/lib/posts/schedule-format";
import type { TimeSlot } from "@/lib/posts/schedule-times";

type Props = {
  date: Date;
  selected: TimeSlot | null;
  format: TimeFormat;
  onFormatChange: (next: TimeFormat) => void;
  onSelect: (slot: TimeSlot) => void;
};

export function ScheduleTimeList({
  date, selected, format, onFormatChange, onSelect,
}: Props) {
  const slots = useMemo(() => buildTimeSlots(), []);
  const now = Date.now();
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between pb-3">
        <h3 className="text-base font-semibold tracking-tight">
          {formatDayHeader(date)}
        </h3>
        <ScheduleFormatToggle value={format} onChange={onFormatChange} />
      </div>
      <div className="scrollbar-thin flex min-h-0 flex-1 flex-col gap-1.5 overflow-y-auto pr-1">
        {slots.map((slot) => {
          const when = combineDateTime(date, slot);
          const disabled = when.getTime() <= now;
          const isSelected =
            !!selected &&
            selected.hour === slot.hour &&
            selected.minute === slot.minute;
          return (
            <ScheduleTimeButton
              key={`${slot.hour}-${slot.minute}`}
              label={formatSlot(slot, format)}
              selected={isSelected}
              disabled={disabled}
              onClick={() => onSelect(slot)}
            />
          );
        })}
      </div>
    </div>
  );
}
