import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

import { cn } from "@/lib/utils";
import type { AnalyticsDelta } from "@/lib/analytics/analytics.types";

export function StatDelta({ delta }: { delta: AnalyticsDelta }) {
  const { diff, pct } = delta;
  const direction = diff > 0 ? "up" : diff < 0 ? "down" : "flat";
  const Icon = direction === "up" ? ArrowUpRight
    : direction === "down" ? ArrowDownRight : Minus;
  const tone = direction === "up" ? "text-emerald-500"
    : direction === "down" ? "text-destructive" : "text-muted-foreground";
  const text = pct === null
    ? `${diff >= 0 ? "+" : ""}${diff} vs prior`
    : `${pct >= 0 ? "+" : ""}${pct}% vs prior`;
  return (
    <span className={cn("inline-flex items-center gap-1 text-xs", tone)}>
      <Icon className="size-3" />
      {text}
    </span>
  );
}
