import { ActivityChart } from "./activity-chart";
import { AnalyticsStatsRow } from "./analytics-stats";
import { BreakdownCard } from "./breakdown-card";
import { InsightsCard } from "./insights-card";
import { RecentPostsTable } from "./recent-posts-table";
import { EngagementVelocityChart } from "./engagement-velocity-chart";
import { PlatformIndexCard } from "./platform-index-card";
import { ImageRoiCard } from "./image-roi-card";
import { CadenceCard } from "./cadence-card";
import { UnderperformersCard } from "./underperformers-card";
import { computeCadence, computeCadenceInsight } from "@/lib/analytics/compute-cadence";
import { computeUnderperformers } from "@/lib/analytics/compute-underperformers";
import type { Analytics } from "@/lib/analytics/analytics.types";
import type { PostMetrics } from "@/types/analytics";
import type { PlatformMetricRow } from "@/lib/analytics/get-platform-metrics";
import type { ImageRoiData } from "@/lib/analytics/get-image-roi";
import type { DailyEngagementRow } from "@/lib/analytics/get-daily-engagement";

type Props = {
  data: Analytics;
  metrics: Map<string, PostMetrics>;
  published: Map<string, string[]>;
  platformMetrics: PlatformMetricRow[];
  imageRoi: ImageRoiData;
  engagement: DailyEngagementRow[];
};

export function AnalyticsView({ data, metrics, published, platformMetrics, imageRoi, engagement }: Props) {
  const cadencePoints = computeCadence(engagement);
  const cadenceInsight = computeCadenceInsight(cadencePoints);
  const underperformers = computeUnderperformers(data.recent, metrics);

  return (
    <div className="space-y-6">
      <AnalyticsStatsRow stats={data.stats} />
      <InsightsCard insights={data.insights} />
      <ActivityChart daily={data.daily} />
      <EngagementVelocityChart series={engagement} />
      <PlatformIndexCard platforms={platformMetrics} />
      <div className="grid gap-4 lg:grid-cols-2">
        <BreakdownCard
          title="Status mix"
          description="Where posts in this window currently sit."
          buckets={data.byStatus}
          emptyMessage="No posts yet."
        />
        <BreakdownCard
          title="Platforms"
          description="Distribution across the targets you've generated for."
          buckets={data.byPlatform}
          emptyMessage="No platforms tracked yet."
        />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <ImageRoiCard data={imageRoi} />
        <CadenceCard points={cadencePoints} insight={cadenceInsight} />
      </div>
      <UnderperformersCard posts={underperformers} />
      <RecentPostsTable posts={data.recent} metrics={metrics} published={published} />
    </div>
  );
}
