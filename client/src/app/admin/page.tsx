import { PageHeader } from "@/components/dashboard/page-header";
import { OverviewStats } from "@/components/admin/overview/overview-stats";
import { getAdminStats } from "@/lib/admin/get-stats";

export default async function AdminOverviewPage() {
  const stats = await getAdminStats();
  return (
    <>
      <PageHeader
        title="Overview"
        description="What's happening across the platform right now."
      />
      {stats ? (
        <OverviewStats stats={stats} />
      ) : (
        <p className="text-sm text-muted-foreground">Failed to load stats.</p>
      )}
    </>
  );
}
