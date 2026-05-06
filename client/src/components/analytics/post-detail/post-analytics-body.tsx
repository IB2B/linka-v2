import { PostAnalyticsMetrics } from "./post-analytics-metrics";
import { PerformanceScoreCard } from "./performance-score-card";
import { EngagementTrendCard } from "./engagement-trend-card";
import { PostEngagementChart } from "./post-engagement-chart";
import { EngagementMixCard } from "./engagement-mix-card";
import { InsightsCard } from "./insights-card";
import { PlatformBreakdownCard } from "./platform-breakdown-card";
import { LifecycleCard } from "./lifecycle-card";
import { AnalyticsStateNotice } from "./analytics-state-notice";
import type { PostDetailData } from "@/lib/analytics/load-post-detail";

export function PostAnalyticsBody({ data }: { data: PostDetailData }) {
  if (!data.analytics || data.analytics.state !== "ok") {
    return <AnalyticsStateNotice state={data.analytics?.state ?? "unposted"} />;
  }
  return (
    <div className="space-y-6">
      <PostAnalyticsMetrics
        totals={data.analytics.totals}
        baseline={data.baseline ?? undefined}
      />
      {data.score && (
        <PerformanceScoreCard
          score={data.score.score}
          percentile={data.score.percentile}
          sampleSize={data.sampleSize}
        />
      )}
      <EngagementTrendCard series={data.series} />
      <div className="grid gap-4 md:grid-cols-2">
        <PostEngagementChart platforms={data.analytics.platforms} />
        <EngagementMixCard totals={data.analytics.totals} />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <InsightsCard insights={data.insights} />
        <PlatformBreakdownCard platforms={data.analytics.platforms} />
        <LifecycleCard post={data.post} />
      </div>
    </div>
  );
}
