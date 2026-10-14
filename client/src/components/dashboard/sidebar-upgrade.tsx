"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { SidebarPlanCard } from "./sidebar-plan-card";
import { SidebarUpgradeCta } from "./sidebar-upgrade-cta";
import type { DashboardUser } from "@/types/dashboard-user";
import type { UsageSummary } from "@/types/usage";

type Props = { user: DashboardUser; usage?: UsageSummary | null };

// Plan card for users; when collapsed, the avatar ring carries usage instead.
export function SidebarUpgrade({ user, usage }: Props) {
  const { state, isMobile } = useSidebar();
  if (user.role !== "USER") return null;
  if (state === "collapsed" && !isMobile) return null;
  if (usage) return <SidebarPlanCard usage={usage} tier={user.tier} />;
  if (user.tier === "free") return <SidebarUpgradeCta tier={user.tier} />;
  return null;
}
