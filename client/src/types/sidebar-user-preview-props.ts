import type { DashboardUser } from "@/types/dashboard-user";
import type { UsageSummary } from "@/types/usage";

export type SidebarUserPreviewProps = {
  user: DashboardUser;
  usage?: UsageSummary | null;
};
