import {
  BarChart3,
  Calendar,
  CreditCard,
  FileText,
  Inbox,
  LayoutDashboard,
  LifeBuoy,
  Mic,
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
      { label: "Voice Lab", href: `${prefix}/voice-lab`, icon: Mic },
      { label: "Calendar", href: `${prefix}/calendar`, icon: Calendar },
      { label: "Inbox", href: `${prefix}/inbox`, icon: Inbox },
      { label: "Analytics", href: `${prefix}/analytics`, icon: BarChart3 },
    ],
  };
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

export function getNavigationForRole(role: UserRole): NavGroup[] {
  if (role === "ADMIN" || role === "SUPER_ADMIN") {
    return [workspace("/admin"), ADMIN_OVERSIGHT, account("/admin")];
  }
  return [workspace("/dashboard"), account("/dashboard")];
}
