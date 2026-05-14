import {
  BarChart3,
  CreditCard,
  FileText,
  LayoutDashboard,
  LifeBuoy,
  MessageSquare,
  Settings,
  Sparkles,
  Users,
} from "lucide-react";

import type { NavGroup } from "@/types/nav-item";

export const ADMIN_NAV: NavGroup[] = [
  {
    label: "Insights",
    items: [
      { label: "Overview", href: "/admin", icon: LayoutDashboard },
      { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
      { label: "AI Usage", href: "/admin/ai-usage", icon: Sparkles },
    ],
  },
  {
    label: "Manage",
    items: [
      { label: "Users", href: "/admin/users", icon: Users },
      { label: "Subscriptions", href: "/admin/subscriptions", icon: CreditCard },
      { label: "Content", href: "/admin/content", icon: FileText },
      { label: "Feedback", href: "/admin/feedback", icon: MessageSquare },
      { label: "Support", href: "/admin/support", icon: LifeBuoy },
    ],
  },
  {
    label: "System",
    items: [
      { label: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];
