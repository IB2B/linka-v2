"use client";

import { useTranslations } from "next-intl";
import { tierLabel } from "@/lib/billing/format";
import { SegmentedMeter } from "@/components/segmented-meter";

import type { DashboardUser } from "@/types/dashboard-user";

export function SidebarUsageMeter({ user }: { user: DashboardUser }) {
  const t = useTranslations("dashboard.sidebarMeter");
  const tier = tierLabel(user.tier);
  const pct = Math.min(100, Math.round((user.postsUsed / user.postsLimit) * 100));
  const remaining = Math.max(0, user.postsLimit - user.postsUsed);

  return (
    <div className="mx-1 mb-1 space-y-2 rounded-lg border bg-card p-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold">{t("planLabel", { tier })}</p>
        <p className="text-xs tabular-nums text-muted-foreground">
          {user.postsUsed}/{user.postsLimit}
        </p>
      </div>
      <SegmentedMeter pct={pct} segments={22} />
      <p className="text-xs text-muted-foreground">
        {t("postsRemaining", { count: remaining })}
      </p>
    </div>
  );
}
