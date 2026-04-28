import type { ComponentProps } from "react";

import type { Sidebar } from "@/components/ui/sidebar";
import type { DashboardUser } from "@/types/dashboard-user";

export type AppSidebarProps = ComponentProps<typeof Sidebar> & {
  user: DashboardUser;
};
