import {
  BarChart3,
  Calendar,
  CreditCard,
  FileText,
  Inbox,
  KanbanSquare,
  LayoutDashboard,
  LifeBuoy,
  Mic,
  Radar,
  RefreshCw,
  Settings,
  Sparkles,
} from "lucide-react";

import { ADMIN_NAV } from "@/lib/dashboard/admin-navigation";
import type { UserFeatures, UserTier } from "@/lib/auth/me";
import { hasFeature } from "@/lib/billing/plan-features";
import type { NavGroup, NavItem } from "@/types/nav-item";
import type { UserRole } from "@/types/user-role";

function workspace(
  prefix: string, tier: UserTier, features: UserFeatures, unreadCount?: number,
): NavGroup {
  const items: (NavItem | false)[] = [
    { label: "Overview", href: prefix, icon: LayoutDashboard },
    hasFeature(tier, "inbox") &&
      { label: "Conversations", href: `${prefix}/inbox`, icon: Inbox, badge: unreadCount || undefined },
    { label: "Pipeline", href: `${prefix}/pipeline`, icon: KanbanSquare },
    { label: "Posts", href: `${prefix}/posts`, icon: FileText },
    { label: "Generate", href: `${prefix}/generate`, icon: Sparkles },
    hasFeature(tier, "trends") &&
      { label: "Trend Radar", href: `${prefix}/trends`, icon: Radar },
    { label: "Voice Lab", href: `${prefix}/voice-lab`, icon: Mic },
    { label: "Calendar", href: `${prefix}/calendar`, icon: Calendar },
    features.recycler &&
      { label: "Recycler", href: `${prefix}/recycler`, icon: RefreshCw },
    hasFeature(tier, "analytics") &&
      { label: "Analytics", href: `${prefix}/analytics`, icon: BarChart3 },
  ];
  return { label: "Workspace", items: items.filter(Boolean) as NavItem[] };
}

function account(prefix: string): NavGroup {
  return {
    label: "Account",
    items: [
      { label: "Billing", href: `${prefix}/billing`, icon: CreditCard },
      { label: "Support", href: `${prefix}/support`, icon: LifeBuoy },
      { label: "Settings", href: `${prefix}/settings`, icon: Settings },
    ],
  };
}

export function getNavigationForRole(
  role: UserRole, tier: UserTier, features: UserFeatures, unreadCount?: number,
): NavGroup[] {
  if (role === "ADMIN") return ADMIN_NAV;
  return [workspace("/dashboard", tier, features, unreadCount), account("/dashboard")];
}
