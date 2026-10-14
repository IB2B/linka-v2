"use client";

import { useLocale, useTranslations } from "next-intl";
import { tierLabel } from "@/lib/billing/format";

const DAY_MS = 86_400_000;

type Props = { tier: string; resetsAt: string };

// Plan name plus when the monthly quotas come back.
export function UsagePanelHeader({ tier, resetsAt }: Props) {
  const t = useTranslations("dashboard.usageMenu");
  const locale = useLocale();
  const reset = new Date(resetsAt);
  const days = Math.max(0, Math.ceil((reset.getTime() - Date.now()) / DAY_MS));
  const date = new Intl.DateTimeFormat(locale, { month: "short", day: "numeric" }).format(reset);

  return (
    <div className="px-2 pt-1.5">
      <p className="text-sm font-semibold leading-tight">
        {t("planLabel", { tier: tierLabel(tier) })}
      </p>
      <p className="mt-0.5 text-xs text-muted-foreground">{t("resets", { date, days })}</p>
    </div>
  );
}
