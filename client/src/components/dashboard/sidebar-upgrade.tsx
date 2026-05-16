"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { SidebarUpgradeCta } from "./sidebar-upgrade-cta";
import { SidebarUsageMeter } from "./sidebar-usage-meter";
import type { DashboardUser } from "@/types/dashboard-user";

export function SidebarUpgrade({ user }: { user: DashboardUser }) {
  const { state, isMobile } = useSidebar();
  if (user.role !== "USER") return null;
  if (state === "collapsed" && !isMobile) return null;
  if (user.tier === "free") return <SidebarUpgradeCta tier={user.tier} />;
  return <SidebarUsageMeter user={user} />;
}
