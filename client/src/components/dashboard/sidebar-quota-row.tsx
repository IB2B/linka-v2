"use client";

import { useLocale, useTranslations } from "next-intl";

import { usagePct, usageTone } from "@/lib/usage/usage-tone";
import { cn } from "@/lib/utils";

const BAR: Record<string, string> = {
  ok: "bg-foreground/50",
  warning: "bg-yellow-500",
  danger: "bg-destructive",
};

// `pace` is how far through the month we are; the tick shows even-pace usage.
type Props = { label: string; used: number; limit: number; pace?: number };

// Label, "used / limit" and a hairline bar. Neutral until a quota runs low.
export function SidebarQuotaRow({ label, used, limit, pace }: Props) {
  const t = useTranslations("dashboard.usagePlan");
  const fmt = new Intl.NumberFormat(useLocale());
  const pct = usagePct(used, limit);
  const tone = usageTone(pct);
  const left = fmt.format(Math.max(0, limit - used));
  const hint = pace === undefined ? t("leftHint", { left }) : t("paceHint", { left });

  return (
    <div className="space-y-1.5" title={hint}>
      <div className="flex items-baseline justify-between gap-2 text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className={cn("font-mono text-[11px] tabular-nums",
          tone === "danger" ? "text-destructive" : "text-foreground/90")}>
          {fmt.format(used)}
          <span className="text-muted-foreground">/{fmt.format(limit)}</span>
        </span>
      </div>
      <div className="relative h-1 rounded-full bg-muted" role="progressbar"
        aria-label={label} aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <div className={cn("h-full rounded-full transition-[width] duration-300", BAR[tone])}
          style={{ width: `${Math.max(pct, used > 0 ? 2 : 0)}%` }} />
        {pace !== undefined ? (
          <span aria-hidden className="absolute -top-0.5 h-2 w-px bg-foreground/40"
            style={{ left: `${pace}%` }} />
        ) : null}
      </div>
    </div>
  );
}
