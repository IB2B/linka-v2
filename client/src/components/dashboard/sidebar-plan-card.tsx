"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { UpgradePlansDialog } from "@/components/billing/upgrade-plans-dialog";
import { tierLabel } from "@/lib/billing/format";
import { cycleElapsedPct } from "@/lib/usage/cycle-progress";
import { offersUpgrade, peakUsagePct, usageTone } from "@/lib/usage/usage-tone";
import { cn } from "@/lib/utils";
import { SidebarQuotaRow } from "./sidebar-quota-row";
import type { UserTier } from "@/lib/auth/me";
import type { UsageSummary } from "@/types/usage";

type Props = { usage: UsageSummary; tier: UserTier };

// Plain plan summary above the account row: plan, reset date, three quotas.
export function SidebarPlanCard({ usage, tier }: Props) {
  const t = useTranslations("dashboard.usagePlan");
  const locale = useLocale();
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const { posts, images, videos } = usage;
  const tone = usageTone(peakUsagePct(usage));
  const pace = cycleElapsedPct(posts.resetsAt);
  const date = new Intl.DateTimeFormat(locale, { month: "short", day: "numeric" })
    .format(new Date(posts.resetsAt));

  return (
    <div className="mx-1 mb-1 space-y-3 rounded-lg border p-3">
      <div className="flex items-baseline justify-between gap-2 text-xs">
        <p className="truncate">
          <span className="font-medium">{tierLabel(tier)}</span>
          <span className="text-muted-foreground"> · {t("resets", { date })}</span>
        </p>
        <Link href="/dashboard/billing"
          className="shrink-0 text-muted-foreground underline-offset-2 hover:text-foreground hover:underline">
          {t("manage")}
        </Link>
      </div>
      <SidebarQuotaRow label={t("posts")} used={posts.used} limit={posts.limit} pace={pace} />
      <SidebarQuotaRow label={t("images")} used={images.used} limit={images.limit} />
      {videos.allowed ? (
        <SidebarQuotaRow label={t("videos")} used={videos.used} limit={videos.limit} pace={pace} />
      ) : (
        <p className="flex justify-between text-xs text-muted-foreground">
          <span>{t("videos")}</span>
          <span>{t("videosLocked")}</span>
        </p>
      )}
      {tone !== "ok" ? (
        <p className={cn("text-xs", tone === "danger" ? "text-destructive" : "text-yellow-600 dark:text-yellow-500")}>
          {t(tone)}
        </p>
      ) : null}
      {offersUpgrade(tier, tone) ? (
        <Button variant="outline" size="sm" className="w-full" onClick={() => setUpgradeOpen(true)}>
          {t("upgrade")}
        </Button>
      ) : null}
      <UpgradePlansDialog open={upgradeOpen} onOpenChange={setUpgradeOpen} currentTier={tier} />
    </div>
  );
}
