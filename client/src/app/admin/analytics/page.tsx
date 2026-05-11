import { PageHeader } from "@/components/dashboard/page-header";
import { RangeTabs } from "@/components/admin/analytics/range-tabs";
import { AnalyticsHero } from "@/components/admin/analytics/analytics-hero";
import { GrowthCard } from "@/components/admin/analytics/growth-card";
import { PublishVsFailCard } from "@/components/admin/analytics/publish-vs-fail-card";
import { FunnelCard } from "@/components/admin/analytics/funnel-card";
import { BreakdownCard } from "@/components/admin/analytics/breakdown-card";
import { TopPublishers } from "@/components/admin/analytics/top-publishers";
import { AiUsageCard } from "@/components/admin/analytics/ai-usage-card";
import { getAnalyticsOverview } from "@/lib/admin/get-analytics";

export const dynamic = "force-dynamic";

const ALLOWED = new Set([7, 30, 90]);

type Sp = { days?: string };

export default async function AdminAnalyticsPage({
  searchParams,
}: { searchParams: Promise<Sp> }) {
  const { days: raw } = await searchParams;
  const days = ALLOWED.has(Number(raw)) ? Number(raw) : 30;
  const data = await getAnalyticsOverview(days);

  if (!data) {
    return <p className="text-sm text-muted-foreground">Failed to load analytics.</p>;
  }
  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <PageHeader
          title="Analytics"
          description="Platform-wide engagement, retention and growth across all users."
        />
        <RangeTabs days={days} />
      </div>
      <div className="space-y-6">
        <AnalyticsHero data={data} />
        <GrowthCard series={data.series} days={days} />
        <AiUsageCard ai={data.ai} days={days} />
        <div className="grid gap-6 lg:grid-cols-2">
          <FunnelCard funnel={data.funnel} days={days} />
          <PublishVsFailCard series={data.series} />
        </div>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <TopPublishers users={data.topPublishers} />
          <div className="grid gap-6">
            <BreakdownCard
              title="Posts by platform"
              rows={data.platforms}
              emptyText="No published posts in this range."
              barClassName="bg-emerald-500"
            />
            <BreakdownCard
              title="Top industries"
              rows={data.industries.map((i) => ({ key: i.industry, count: i.count }))}
              emptyText="No industries set yet."
              barClassName="bg-violet-500"
            />
            <BreakdownCard
              title="Subscriptions by plan"
              rows={data.plans}
              emptyText="No subscriptions yet."
              format={(k) => (k === "free" ? "Free" : k)}
              barClassName="bg-sky-500"
            />
          </div>
        </div>
      </div>
    </>
  );
}
