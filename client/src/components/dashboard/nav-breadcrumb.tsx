"use client";

import { usePathname } from "next/navigation";

const LABELS: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/inbox": "Inbox",
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

  // Exact match first, then longest prefix match for nested routes.
  const label =
    LABELS[pathname] ??
    Object.entries(LABELS)
      .filter(([k]) => k !== "/dashboard" && pathname.startsWith(k))
      .sort((a, b) => b[0].length - a[0].length)[0]?.[1] ??
    "Dashboard";

  return (
    <span className="text-sm font-medium text-muted-foreground">{label}</span>
  );
}
