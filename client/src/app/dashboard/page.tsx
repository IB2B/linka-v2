import { PageHeader } from "@/components/dashboard/page-header";
import { StatGrid } from "@/components/dashboard/stat-grid";
import { RecentPosts } from "@/components/dashboard/recent-posts";
import { UpcomingPosts } from "@/components/dashboard/upcoming-posts";
import { UsageCard } from "@/components/dashboard/usage-card";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { StatusBreakdownCard } from "@/components/dashboard/status-breakdown-card";
import { ActivityChart } from "@/components/analytics/activity-chart";
import { getPosts } from "@/lib/posts/get-posts";
import { getBillingOverview } from "@/lib/billing/get-overview";
import {
  countPosts, recentPosts, upcomingPosts,
} from "@/lib/dashboard/build-overview";
import { buildStats } from "@/lib/dashboard/build-stats";
import { buildDaily } from "@/lib/dashboard/build-daily";

export default async function UserDashboardPage() {
  const [posts, billing] = await Promise.all([
    getPosts(), getBillingOverview(),
  ]);
  const counts = countPosts(posts);
  const stats = buildStats(counts);
  const daily = buildDaily(posts);
  const overview = billing.ok ? billing.overview : null;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Overview"
        description="Your drafts, schedule, and AI generations at a glance."
      />
      <StatGrid stats={stats} />
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ActivityChart daily={daily} />
        </div>
        <StatusBreakdownCard counts={counts} />
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentPosts posts={recentPosts(posts)} />
        </div>
        <div className="flex flex-col gap-4">
          <UsageCard overview={overview} />
          <UpcomingPosts posts={upcomingPosts(posts)} />
        </div>
      </div>
      <QuickActions />
    </div>
  );
}
