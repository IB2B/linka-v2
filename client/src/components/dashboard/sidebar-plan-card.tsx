"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { UpgradePlansDialog } from "@/components/billing/upgrade-plans-dialog";
import { offersUpgrade, peakUsagePct, usageTone } from "@/lib/usage/usage-tone";
import { cn } from "@/lib/utils";
import { UsagePlanHeading } from "./usage-plan-heading";
import { UsageQuotaTiles } from "./usage-quota-tiles";
import type { UserTier } from "@/lib/auth/me";
import type { UsageSummary } from "@/types/usage";

type Props = { usage: UsageSummary; tier: UserTier };

// Always-visible plan card above the account row: quotas, reset, next step.
export function SidebarPlanCard({ usage, tier }: Props) {
  const t = useTranslations("dashboard.usagePlan");
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const tone = usageTone(peakUsagePct(usage));

  return (
    <div className="mx-1 mb-1 space-y-2.5 rounded-lg border bg-card p-2.5">
      <UsagePlanHeading tier={tier} resetsAt={usage.posts.resetsAt} />
      <UsageQuotaTiles usage={usage} />
      {tone !== "ok" ? (
        <p className={cn("text-xs",
          tone === "danger" ? "text-destructive" : "text-yellow-600 dark:text-yellow-500")}>
          {t(tone)}
        </p>
      ) : null}
      <div className="flex items-center justify-between gap-2">
        <Link href="/dashboard/billing"
          className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground">
          {t("manage")}
          <ArrowRight className="size-3" />
        </Link>
        {offersUpgrade(tier, tone) ? (
          <Button size="xs" onClick={() => setUpgradeOpen(true)}>{t("upgrade")}</Button>
        ) : null}
      </div>
      <UpgradePlansDialog open={upgradeOpen} onOpenChange={setUpgradeOpen} currentTier={tier} />
    </div>
  );
}
