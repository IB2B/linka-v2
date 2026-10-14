"use client";

import { useLocale } from "next-intl";

import { usagePct, usageTone } from "@/lib/usage/usage-tone";
import { cn } from "@/lib/utils";

const BAR: Record<string, string> = {
  ok: "bg-foreground/50",
  warning: "bg-yellow-500",
  danger: "bg-destructive",
};

type Props = { label: string; used: number; limit: number };

// Label, "used / limit" and a hairline bar. Neutral until a quota runs low.
export function SidebarQuotaRow({ label, used, limit }: Props) {
  const fmt = new Intl.NumberFormat(useLocale());
  const pct = usagePct(used, limit);
  const tone = usageTone(pct);

  return (
    <div className="space-y-1">
      <div className="flex items-baseline justify-between gap-2 text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className={cn("tabular-nums", tone === "danger" ? "text-destructive" : "text-foreground/80")}>
          {fmt.format(used)}
          <span className="text-muted-foreground"> / {fmt.format(limit)}</span>
        </span>
      </div>
      <div className="h-1 overflow-hidden rounded-full bg-muted" role="progressbar"
        aria-label={label} aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <div className={cn("h-full rounded-full transition-[width] duration-300", BAR[tone])}
          style={{ width: `${Math.max(pct, used > 0 ? 2 : 0)}%` }} />
      </div>
    </div>
  );
}
