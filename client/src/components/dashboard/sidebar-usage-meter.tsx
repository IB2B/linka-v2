"use client";

import { useTranslations } from "next-intl";
import { tierLabel } from "@/lib/billing/format";
import { SidebarUsageRow } from "./sidebar-usage-row";

import type { DashboardUser } from "@/types/dashboard-user";

// Posts and videos are separate monthly quotas: a video costs far more to
// render than a post, so plans cap it much lower. Free plans have no video.
export function SidebarUsageMeter({ user }: { user: DashboardUser }) {
  const t = useTranslations("dashboard.sidebarMeter");

  return (
    <div className="mx-1 mb-1 space-y-3 rounded-lg border bg-card p-3">
      <p className="text-xs font-semibold">
        {t("planLabel", { tier: tierLabel(user.tier) })}
      </p>
      <SidebarUsageRow label={t("posts")} used={user.postsUsed}
        limit={user.postsLimit} />
      {user.videosLimit > 0 ? (
        <SidebarUsageRow label={t("videos")} used={user.videosUsed}
          limit={user.videosLimit} />
      ) : null}
    </div>
  );
}
