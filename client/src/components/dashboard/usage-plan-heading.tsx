"use client";

import { Crown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { tierLabel } from "@/lib/billing/format";

const DAY_MS = 86_400_000;

type Props = { tier: string; resetsAt: string };

// Plan name on the left, a "resets in N days" pill on the right.
export function UsagePlanHeading({ tier, resetsAt }: Props) {
  const t = useTranslations("dashboard.usageMenu");
  const locale = useLocale();
  const reset = new Date(resetsAt);
  const days = Math.max(0, Math.ceil((reset.getTime() - Date.now()) / DAY_MS));
  const date = new Intl.DateTimeFormat(locale, { month: "long", day: "numeric" }).format(reset);

  return (
    <div className="flex items-center justify-between gap-2">
      <span className="flex min-w-0 items-center gap-1.5">
        <Crown className="size-3.5 shrink-0 text-primary" />
        <span className="truncate text-sm font-semibold">
          {t("planLabel", { tier: tierLabel(tier) })}
        </span>
      </span>
      <span title={date}
        className="shrink-0 rounded-full border bg-background px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
        {t("resetsIn", { days })}
      </span>
    </div>
  );
}
