import { PageHeader } from "@/components/dashboard/page-header";
import { RangeTabs } from "@/components/admin/analytics/range-tabs";
import { BreakdownCard } from "@/components/admin/analytics/breakdown-card";
import { UsageHero } from "@/components/admin/ai-usage/usage-hero";
import { UsageChartCard } from "@/components/admin/ai-usage/usage-chart-card";
import { ImageOutcomesCard } from "@/components/admin/ai-usage/image-outcomes-card";
import { TopGenerators } from "@/components/admin/ai-usage/top-generators";
import { getAiUsageOverview } from "@/lib/admin/get-ai-usage";

export const dynamic = "force-dynamic";

const ALLOWED = new Set([7, 30, 90]);

type Sp = { days?: string };

export default async function AdminAiUsagePage({
  searchParams,
}: { searchParams: Promise<Sp> }) {
  const { days: raw } = await searchParams;
  const days = ALLOWED.has(Number(raw)) ? Number(raw) : 30;
  const data = await getAiUsageOverview(days);

  if (!data) {
    return <p className="text-sm text-muted-foreground">Failed to load AI usage.</p>;
  }
  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <PageHeader
          title="AI Usage"
          description="Generation volume, image outcomes and the users producing the most content."
        />
        <RangeTabs days={days} basePath="/admin/ai-usage" />
      </div>
      <div className="space-y-6">
        <UsageHero data={data} />
        <UsageChartCard series={data.series} days={days} />
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <TopGenerators users={data.topGenerators} />
          <div className="grid gap-6">
            <ImageOutcomesCard rows={data.imageBreakdown} />
            <BreakdownCard
              title="Drafts by platform"
              rows={data.platforms}
              emptyText="No drafts in this range."
              barClassName="bg-emerald-500"
            />
          </div>
        </div>
      </div>
    </>
  );
}
