"use client";

import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import type { NavKey } from "@/types/nav-item";

const ROUTE_LABEL: Record<string, NavKey> = {
  "/dashboard": "Overview",
  "/dashboard/inbox": "Conversations",
  "/dashboard/pipeline": "Pipeline",
  "/dashboard/posts": "Posts",
  "/dashboard/generate": "Generate",
  "/dashboard/trends": "Trend Radar",
  "/dashboard/voice-lab": "Voice Lab",
  "/dashboard/calendar": "Calendar",
  "/dashboard/recycler": "Recycler",
  "/dashboard/analytics": "Analytics",
  "/dashboard/billing": "Billing",
  "/dashboard/support": "Support",
  "/dashboard/settings": "Settings",
};

export function NavBreadcrumb() {
  const pathname = usePathname();
  const t = useTranslations("nav");

  const key: NavKey =
    ROUTE_LABEL[pathname] ??
    Object.entries(ROUTE_LABEL)
      .filter(([k]) => k !== "/dashboard" && pathname.startsWith(k))
      .sort((a, b) => b[0].length - a[0].length)[0]?.[1] ??
    "Overview";

  return (
    <span className="text-sm font-medium text-muted-foreground">{t(key)}</span>
  );
}
