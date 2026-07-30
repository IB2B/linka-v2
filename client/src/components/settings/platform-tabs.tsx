"use client";

import { PLATFORMS, type Platform } from "@/lib/content/platforms";
import { cn } from "@/lib/utils";

type Props = { value: Platform; onChange: (platform: Platform) => void };

export function PlatformTabs({ value, onChange }: Props) {
  return (
    <div role="tablist" className="flex flex-wrap gap-1.5">
      {PLATFORMS.map((p) => (
        <button
          key={p.value}
          type="button"
          role="tab"
          aria-selected={value === p.value}
          onClick={() => onChange(p.value)}
          className={cn(
            "cursor-pointer rounded-md px-3 py-1.5 text-sm transition-colors",
            value === p.value
              ? "bg-muted font-medium text-foreground"
              : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
          )}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}
