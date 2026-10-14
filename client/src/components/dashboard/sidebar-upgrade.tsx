"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { SidebarUpgradeCta } from "./sidebar-upgrade-cta";
import type { DashboardUser } from "@/types/dashboard-user";

// Free users get a standing upgrade nudge; paid usage lives in the header pill.
export function SidebarUpgrade({ user }: { user: DashboardUser }) {
  const { state, isMobile } = useSidebar();
  if (user.role !== "USER" || user.tier !== "free") return null;
  if (state === "collapsed" && !isMobile) return null;
  return <SidebarUpgradeCta tier={user.tier} />;
}
