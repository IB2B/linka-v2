"use client";

import { Lock, type LucideIcon } from "lucide-react";
import { useLocale } from "next-intl";

import { usagePct, usageTone, TONE_TEXT } from "@/lib/usage/usage-tone";
import { cn } from "@/lib/utils";
import { UsageRing } from "./usage-ring";

type Props = {
  icon: LucideIcon;
  label: string;
  used: number;
  limit: number;
  detail: string;
  locked?: string;
};

// One quota as a tile: a ring around the icon, then what's left in big type.
export function UsageQuotaTile({ icon: Icon, label, used, limit, detail, locked }: Props) {
  const locale = useLocale();
  const pct = usagePct(used, limit);
  const tone = usageTone(pct);
  const left = new Intl.NumberFormat(locale, { notation: "compact" })
    .format(Math.max(0, limit - used));

  return (
    <div title={detail}
      className="flex flex-col items-center gap-1.5 rounded-md bg-background/60 px-1 py-2.5 text-center">
      <span className="relative flex size-9 items-center justify-center">
        {locked ? null : <UsageRing pct={pct} tone={tone} stroke={2} className="absolute inset-0 size-9" />}
        {locked ? (
          <span className="flex size-9 items-center justify-center rounded-full border border-dashed">
            <Lock className="size-3.5 text-muted-foreground" />
          </span>
        ) : (
          <Icon className={cn("size-3.5", TONE_TEXT[tone])} />
        )}
      </span>
      <span className={cn("text-sm font-semibold tabular-nums leading-none",
        locked && "text-xs text-muted-foreground", tone === "danger" && "text-destructive")}>
        {locked ?? left}
      </span>
      <span className="text-[10px] leading-none text-muted-foreground">{label}</span>
    </div>
  );
}
