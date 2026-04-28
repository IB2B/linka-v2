import {
  BarChart3,
  Calendar,
  CreditCard,
  FileText,
  LayoutDashboard,
  Settings,
  Sparkles,
  Users,
} from "lucide-react";

import type { NavGroup } from "@/types/nav-item";
import type { UserRole } from "@/types/user-role";

function workspace(prefix: string): NavGroup {
  return {
    label: "Workspace",
    items: [
      { label: "Overview", href: prefix, icon: LayoutDashboard },
      { label: "Posts", href: `${prefix}/posts`, icon: FileText },
      { label: "Generate", href: `${prefix}/generate`, icon: Sparkles },
      { label: "Calendar", href: `${prefix}/calendar`, icon: Calendar },
      { label: "Analytics", href: `${prefix}/analytics`, icon: BarChart3 },
    ],
  };
}

function account(prefix: string): NavGroup {
  return {
    label: "Account",
    items: [
      { label: "Billing", href: `${prefix}/billing`, icon: CreditCard },
      { label: "Settings", href: `${prefix}/settings`, icon: Settings },
    ],
  };
}

const ADMIN_OVERSIGHT: NavGroup = {
  label: "Oversight",
  items: [{ label: "Users", href: "/admin/users", icon: Users }],
};

export function getNavigationForRole(role: UserRole): NavGroup[] {
  if (role === "ADMIN" || role === "SUPER_ADMIN") {
    return [workspace("/admin"), ADMIN_OVERSIGHT, account("/admin")];
  }
  return [workspace("/dashboard"), account("/dashboard")];
}
