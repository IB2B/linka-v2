import { PageHeader } from "@/components/dashboard/page-header";
import { StatGrid } from "@/components/dashboard/stat-grid";
import { RecentPosts } from "@/components/dashboard/recent-posts";
import { UpcomingPosts } from "@/components/dashboard/upcoming-posts";
import { UsageCard } from "@/components/dashboard/usage-card";
import { StatusBreakdownCard } from "@/components/dashboard/status-breakdown-card";
import { EngagementCard } from "@/components/dashboard/engagement-card";
import { getPosts } from "@/lib/posts/get-posts";
import { getBillingOverview } from "@/lib/billing/get-overview";
import { getEngagementSeries } from "@/lib/dashboard/get-engagement";
import {
  countPosts, recentPosts, upcomingPosts,
} from "@/lib/dashboard/build-overview";
import { buildStats } from "@/lib/dashboard/build-stats";
import { fetchMe } from "@/lib/auth/me";

export default async function UserDashboardPage() {
  const [posts, billing, engagement, me] = await Promise.all([
    getPosts(), getBillingOverview(), getEngagementSeries(30), fetchMe(),
  ]);
  const counts = countPosts(posts);
  const stats = buildStats(counts);
  const overview = billing.ok ? billing.overview : null;
  const greeting = me?.firstName ? `Welcome back, ${me.firstName}` : "Overview";

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={greeting}
        description="Your drafts, schedule, and engagement at a glance."
      />
      <StatGrid stats={stats} />
      <EngagementCard data={engagement} />
      <div className="grid gap-4 lg:grid-cols-3">
        <UpcomingPosts posts={upcomingPosts(posts)} />
        <StatusBreakdownCard counts={counts} />
        <UsageCard overview={overview} />
      </div>
      <RecentPosts posts={recentPosts(posts)} />
    </div>
  );
}
