"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { UpgradePlansDialog } from "@/components/billing/upgrade-plans-dialog";
import { peakUsagePct, usageTone } from "@/lib/usage/usage-tone";
import { UsageRing } from "./usage-ring";
import { UsagePanelHeader } from "./usage-panel-header";
import { UsagePanelRows } from "./usage-panel-rows";
import { UsagePanelFooter } from "./usage-panel-footer";
import type { UserTier } from "@/lib/auth/me";
import type { UsageSummary } from "@/types/usage";

type Props = { usage: UsageSummary; tier: UserTier };

// Header usage button: a ring for the fullest quota and posts left, opening a
// panel with every quota, the reset date and an upgrade path when it's needed.
export function UsagePill({ usage, tier }: Props) {
  const t = useTranslations("dashboard.usagePill");
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const peak = peakUsagePct(usage);
  const tone = usageTone(peak);
  const left = Math.max(0, usage.posts.limit - usage.posts.used);
  const count = new Intl.NumberFormat(locale, { notation: "compact" }).format(left);
  const showUpgrade = tier === "free" || (tone !== "ok" && tier !== "enterprise");

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger render={
          <Button variant="outline" size="sm" className="gap-2" aria-label={t("trigger")} />
        }>
          <UsageRing pct={peak} tone={tone} />
          <span className="hidden tabular-nums sm:inline">{t("postsLeft", { count })}</span>
        </PopoverTrigger>
        <PopoverContent align="end" sideOffset={8} className="w-80 p-0">
          <UsagePanelHeader tier={tier} resetsAt={usage.posts.resetsAt} />
          <UsagePanelRows usage={usage} />
          <UsagePanelFooter tone={tone} showUpgrade={showUpgrade}
            onClose={() => setOpen(false)}
            onUpgrade={() => { setOpen(false); setUpgradeOpen(true); }} />
        </PopoverContent>
      </Popover>
      <UpgradePlansDialog open={upgradeOpen} onOpenChange={setUpgradeOpen} currentTier={tier} />
    </>
  );
}
