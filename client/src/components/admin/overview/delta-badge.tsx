import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

import { cn } from "@/lib/utils";

type Props = { curr: number; prev: number };

export function DeltaBadge({ curr, prev }: Props) {
  if (prev === 0 && curr === 0) {
    return (
      <span className="inline-flex items-center gap-0.5 text-[11px] tracking-tight text-muted-foreground">
        <Minus className="size-3" />
        flat
      </span>
    );
  }
  const pct = prev === 0
    ? 100
    : Math.round(((curr - prev) / Math.max(prev, 1)) * 100);
  const up = pct >= 0;
  const Icon = pct === 0 ? Minus : up ? ArrowUpRight : ArrowDownRight;
  return (
    <span className={cn(
      "inline-flex items-center gap-0.5 text-[11px] font-medium tracking-tight",
      pct === 0
        ? "text-muted-foreground"
        : up
        ? "text-emerald-600 dark:text-emerald-400"
        : "text-red-600 dark:text-red-400",
    )}>
      <Icon className="size-3" />
      {Math.abs(pct)}%
    </span>
  );
}
