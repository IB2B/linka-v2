"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { StatusFilter } from "@/types/calendar";

const OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "scheduled", label: "Scheduled" },
  { value: "posted", label: "Posted" },
  { value: "draft", label: "Drafts" },
  { value: "failed", label: "Failed" },
];

type Props = {
  value: StatusFilter;
  onChange: (value: StatusFilter) => void;
};

export function CalendarFilter({ value, onChange }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-1 rounded-md border bg-background p-1">
      {OPTIONS.map((opt) => (
        <Button
          key={opt.value}
          size="sm"
          variant={value === opt.value ? "secondary" : "ghost"}
          className={cn("h-7 px-2.5 text-xs")}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </Button>
      ))}
    </div>
  );
}
