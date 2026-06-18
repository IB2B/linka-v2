import { getTranslations } from "next-intl/server";

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
import { countPosts, recentPosts, upcomingPosts } from "@/lib/dashboard/build-overview";
import { buildStats } from "@/lib/dashboard/build-stats";
import { fetchMe } from "@/lib/auth/me";

const RANGES = new Set([30, 60, 90]);

type Props = { searchParams: Promise<{ days?: string }> };

export default async function UserDashboardPage({ searchParams }: Props) {
  const { days: rawDays } = await searchParams;
  const days = RANGES.has(Number(rawDays)) ? Number(rawDays) : 30;
  const [posts, billing, engagement, me, t] = await Promise.all([
    getPosts(), getBillingOverview(), getEngagementSeries(days), fetchMe(),
    getTranslations("dashboard"),
  ]);
  const counts = countPosts(posts);
  const stats = buildStats(counts, (k) => t(`stats.${k}`));
  const overview = billing.ok ? billing.overview : null;
  const greeting = me?.firstName
    ? t("welcomeBack", { name: me.firstName })
    : t("overview");

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title={greeting} description={t("subtitle")} />
      <StatGrid stats={stats} />
      <EngagementCard data={engagement} days={days} />
      <div className="grid gap-4 lg:grid-cols-3">
        <UpcomingPosts posts={upcomingPosts(posts)} />
        <StatusBreakdownCard counts={counts} />
        <UsageCard overview={overview} />
      </div>
      <RecentPosts posts={recentPosts(posts)} />
    </div>
  );
}
