"use client";

import { Button } from "@/components/ui/button";
import type { CalendarViewMode } from "@/types/calendar";

const VIEWS: { value: CalendarViewMode; label: string }[] = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
  { value: "year", label: "Year" },
];

type Props = { value: CalendarViewMode; onChange: (v: CalendarViewMode) => void };

export function CalendarViewSwitch({ value, onChange }: Props) {
  return (
    <div role="tablist" aria-label="Calendar view"
      className="flex items-center gap-1 rounded-md border bg-background p-1">
      {VIEWS.map((v) => (
        <Button key={v.value} role="tab" aria-selected={value === v.value}
          size="sm" variant={value === v.value ? "secondary" : "ghost"}
          className="h-7 px-2.5 text-xs" onClick={() => onChange(v.value)}>
          {v.label}
        </Button>
      ))}
    </div>
  );
}
