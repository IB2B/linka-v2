"use client";

import { cn } from "@/lib/utils";
import type { TicketStatus } from "@/lib/support/support.types";

export type FilterValue = "all" | TicketStatus;

const OPTIONS: { value: FilterValue; label: string }[] = [
  { value: "all", label: "All" },
  { value: "open", label: "Open" },
  { value: "pending", label: "Pending" },
  { value: "resolved", label: "Resolved" },
  { value: "closed", label: "Closed" },
];

type Props = {
  value: FilterValue;
  onChange: (v: FilterValue) => void;
  counts: Record<FilterValue, number>;
};

export function TicketFilter({ value, onChange, counts }: Props) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {OPTIONS.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={cn(
            "rounded-full border px-2.5 py-1 text-xs transition-colors",
            value === o.value
              ? "border-foreground bg-foreground text-background"
              : "border-border bg-background text-muted-foreground hover:bg-accent",
          )}
        >
          {o.label}
          <span className="ml-1 tabular-nums opacity-70">{counts[o.value]}</span>
        </button>
      ))}
    </div>
  );
}
