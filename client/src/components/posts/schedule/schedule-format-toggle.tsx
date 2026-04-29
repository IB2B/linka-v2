"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { TimeFormat } from "@/lib/posts/schedule-format";

type Props = {
  value: TimeFormat;
  onChange: (next: TimeFormat) => void;
};

export function ScheduleFormatToggle({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-1 rounded-md border bg-background p-0.5">
      {(["12h", "24h"] as TimeFormat[]).map((opt) => (
        <Button
          key={opt}
          type="button"
          size="sm"
          variant={value === opt ? "secondary" : "ghost"}
          className={cn("h-6 px-2 text-xs")}
          onClick={() => onChange(opt)}
        >
          {opt}
        </Button>
      ))}
    </div>
  );
}
