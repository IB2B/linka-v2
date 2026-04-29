"use client";

import { Button } from "@/components/ui/button";
import { PLATFORMS } from "@/lib/calendar/platforms";
import { cn } from "@/lib/utils";
import type { PlatformFilter } from "@/types/calendar";

type Props = {
  value: PlatformFilter;
  onChange: (value: PlatformFilter) => void;
};

const LABELS: Record<string, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  linkedin: "LinkedIn",
  tiktok: "TikTok",
  twitter: "X",
  threads: "Threads",
};

export function CalendarPlatformFilter({ value, onChange }: Props) {
  const options: PlatformFilter[] = ["all", ...PLATFORMS];
  return (
    <div className="flex flex-wrap items-center gap-1 rounded-md border bg-background p-1">
      {options.map((opt) => (
        <Button
          key={opt}
          size="sm"
          variant={value === opt ? "secondary" : "ghost"}
          className={cn("h-7 px-2.5 text-xs")}
          onClick={() => onChange(opt)}
        >
          {opt === "all" ? "All" : LABELS[opt] ?? opt}
        </Button>
      ))}
    </div>
  );
}
