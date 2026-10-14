"use client";

import Link from "next/link";
import { CreditCard, FileText, Image as ImageIcon, Sparkles, Video } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { offersUpgrade, peakUsagePct, usageTone } from "@/lib/usage/usage-tone";
import { cn } from "@/lib/utils";
import { UsagePlanHeading } from "./usage-plan-heading";
import { UsageQuotaTile } from "./usage-quota-tile";
import type { UserTier } from "@/lib/auth/me";
import type { UsageSummary } from "@/types/usage";

type Props = { usage: UsageSummary; tier: UserTier; onUpgrade: () => void };

// Plan card at the top of the account menu: three quota tiles and a next step.
export function SidebarUserUsage({ usage, tier, onUpgrade }: Props) {
  const t = useTranslations("dashboard.usageMenu");
  const { posts, images, videos } = usage;
  const tone = usageTone(peakUsagePct(usage));
  const detail = (used: number, limit: number) => t("detail", { used, limit });

  return (
    <>
      <div className="m-1 space-y-3 rounded-lg border bg-muted/40 p-2.5">
        <UsagePlanHeading tier={tier} resetsAt={posts.resetsAt} />
        <div className="grid grid-cols-3 gap-1.5">
          <UsageQuotaTile icon={FileText} label={t("posts")} used={posts.used}
            limit={posts.limit} detail={detail(posts.used, posts.limit)} />
          <UsageQuotaTile icon={ImageIcon} label={t("images")} used={images.used}
            limit={images.limit} detail={detail(images.used, images.limit)} />
          <UsageQuotaTile icon={Video} label={t("videos")} used={videos.used}
            limit={videos.limit} detail={videos.allowed ? detail(videos.used, videos.limit) : t("videosLocked")}
            locked={videos.allowed ? undefined : t("creatorPlus")} />
        </div>
        {tone !== "ok" ? (
          <p className={cn("text-xs",
            tone === "danger" ? "text-destructive" : "text-yellow-600 dark:text-yellow-500")}>
            {t(tone)}
          </p>
        ) : null}
      </div>
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
