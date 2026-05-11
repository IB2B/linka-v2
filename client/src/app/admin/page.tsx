import { PageHeader } from "@/components/dashboard/page-header";
import { OverviewHero } from "@/components/admin/overview/overview-hero";
import { OverviewTrend } from "@/components/admin/overview/overview-trend";
import { OverviewSubscriptions } from "@/components/admin/overview/overview-subscriptions";
import { OverviewActivity } from "@/components/admin/overview/overview-activity";
import { OverviewRecentUsers } from "@/components/admin/overview/overview-recent-users";
import { getAdminStats } from "@/lib/admin/get-stats";
import { getAdminSeries } from "@/lib/admin/get-series";
import { getActivity } from "@/lib/admin/get-activity";
import { getAdminUsers } from "@/lib/admin/get-users";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  const [stats, series, events, usersRes] = await Promise.all([
    getAdminStats(), getAdminSeries(), getActivity(10), getAdminUsers(),
  ]);
  const recent = usersRes.users.slice(0, 6);

  return (
    <>
      <PageHeader
        title="Overview"
        description="What's happening across the platform right now."
      />
      {stats ? (
        <div className="space-y-6">
          <OverviewHero stats={stats} />
          <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <OverviewTrend series={series} />
            <OverviewSubscriptions stats={stats} />
          </div>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <OverviewActivity events={events} />
            <OverviewRecentUsers users={recent} />
          </div>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">Failed to load stats.</p>
      )}
    </>
  );
}
