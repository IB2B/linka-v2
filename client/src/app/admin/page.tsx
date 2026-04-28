import { PageHeader } from "@/components/dashboard/page-header";
import { StatGrid } from "@/components/dashboard/stat-grid";
import { ADMIN_STATS } from "@/lib/dashboard/admin-stats";

export default function AdminOverviewPage() {
  return (
    <>
      <PageHeader
        title="Overview"
        description="What's happening across your workspace today."
      />
      <StatGrid stats={ADMIN_STATS} />
    </>
  );
}
