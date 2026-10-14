import type { ComponentProps } from "react";

import type { Sidebar } from "@/components/ui/sidebar";
import type { DashboardUser } from "@/types/dashboard-user";
import type { UsageSummary } from "@/types/usage";

export type AppSidebarProps = ComponentProps<typeof Sidebar> & {
  user: DashboardUser;
  usage?: UsageSummary | null;
};
