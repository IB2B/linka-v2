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
  Users,
} from "lucide-react";

import type { UserFeatures } from "@/lib/auth/me";
import type { NavGroup, NavItem } from "@/types/nav-item";
import type { UserRole } from "@/types/user-role";

function workspace(prefix: string, features: UserFeatures): NavGroup {
  const items: (NavItem | false)[] = [
    { label: "Overview", href: prefix, icon: LayoutDashboard },
    { label: "Inbox", href: `${prefix}/inbox`, icon: Inbox },
    { label: "Pipeline", href: `${prefix}/pipeline`, icon: KanbanSquare },
    { label: "Posts", href: `${prefix}/posts`, icon: FileText },
    { label: "Generate", href: `${prefix}/generate`, icon: Sparkles },
    { label: "Trend Radar", href: `${prefix}/trends`, icon: Radar },
    { label: "Voice Lab", href: `${prefix}/voice-lab`, icon: Mic },
    { label: "Calendar", href: `${prefix}/calendar`, icon: Calendar },
    features.recycler &&
      { label: "Recycler", href: `${prefix}/recycler`, icon: RefreshCw },
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

const ADMIN_OVERSIGHT: NavGroup = {
  label: "Oversight",
  items: [{ label: "Users", href: "/admin/users", icon: Users }],
};

export function getNavigationForRole(
  role: UserRole, features: UserFeatures,
): NavGroup[] {
  if (role === "ADMIN" || role === "SUPER_ADMIN") {
    return [workspace("/admin", features), ADMIN_OVERSIGHT, account("/admin")];
  }
  return [workspace("/dashboard", features), account("/dashboard")];
}
