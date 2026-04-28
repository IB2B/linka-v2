import { PageHeader } from "@/components/dashboard/page-header";
import { StatGrid } from "@/components/dashboard/stat-grid";
import { USER_STATS } from "@/lib/dashboard/user-stats";

export default function UserDashboardPage() {
  return (
    <>
      <PageHeader
        title="Overview"
        description="Your drafts, schedule, and AI generations at a glance."
      />
      <StatGrid stats={USER_STATS} />
    </>
  );
}
