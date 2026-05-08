import Link from "next/link";

import { ACTIVITY_FILTERS } from "@/lib/admin/activity-filters";
import type { ActivitySummary } from "@/types/admin";

function countFor(value: string, summary: ActivitySummary | null): number | null {
  if (!summary) return null;
  if (value === "all") return summary.events.curr;
  return summary.byType[value] ?? 0;
}

export function ActivityFilter({ active, summary }: { active: string; summary: ActivitySummary | null }) {
  return (
    <div className="-mx-1 flex flex-wrap gap-1.5 overflow-x-auto px-1">
      {ACTIVITY_FILTERS.map((f) => {
        const isActive = active === f.value;
        const n = countFor(f.value, summary);
        const href = f.value === "all" ? "/admin/activity" : `/admin/activity?type=${f.value}`;
        return (
          <Link
            key={f.value}
            href={href}
            scroll={false}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium tracking-tight transition ${
              isActive
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-card text-foreground hover:bg-muted"
            }`}
          >
            {f.label}
            {n !== null && (
              <span className={`tabular-nums ${isActive ? "text-background/70" : "text-muted-foreground"}`}>
                {n}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}
