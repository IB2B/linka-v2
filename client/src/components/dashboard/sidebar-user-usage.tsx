"use client";

import Link from "next/link";
import { CreditCard, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { offersUpgrade, peakUsagePct, usageTone } from "@/lib/usage/usage-tone";
import { cn } from "@/lib/utils";
import { UsagePanelHeader } from "./usage-panel-header";
import { UsagePanelRows } from "./usage-panel-rows";
import type { UserTier } from "@/lib/auth/me";
import type { UsageSummary } from "@/types/usage";

type Props = { usage: UsageSummary; tier: UserTier; onUpgrade: () => void };

// Plan block at the top of the account menu: quotas, reset date, next step.
export function SidebarUserUsage({ usage, tier, onUpgrade }: Props) {
  const t = useTranslations("dashboard.usageMenu");
  const tone = usageTone(peakUsagePct(usage));
  return (
    <>
      <UsagePanelHeader tier={tier} resetsAt={usage.posts.resetsAt} />
      <UsagePanelRows usage={usage} />
      {tone !== "ok" ? (
        <p className={cn("px-2 pb-2 text-xs",
          tone === "danger" ? "text-destructive" : "text-yellow-600 dark:text-yellow-500")}>
          {t(tone)}
        </p>
      ) : null}
      <DropdownMenuGroup>
        <DropdownMenuItem render={<Link href="/dashboard/billing" />}>
          <CreditCard />
          {t("manage")}
        </DropdownMenuItem>
        {offersUpgrade(tier, tone) ? (
          <DropdownMenuItem onClick={onUpgrade}>
            <Sparkles />
            {t("upgrade")}
          </DropdownMenuItem>
        ) : null}
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
    </>
  );
}
