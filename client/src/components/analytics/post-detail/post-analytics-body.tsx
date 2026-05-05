import { PerformanceScoreCard } from "./performance-score-card";
import { PostAnalyticsMetrics } from "./post-analytics-metrics";
import { PostEngagementChart } from "./post-engagement-chart";
import { EngagementMixCard } from "./engagement-mix-card";
import { PlatformBreakdownCard } from "./platform-breakdown-card";
import { EngagementTrendCard } from "./engagement-trend-card";
import { InsightsCard } from "./insights-card";
import { AnalyticsStateNotice } from "./analytics-state-notice";
import type { PostDetailData } from "@/lib/analytics/load-post-detail";

export function PostAnalyticsBody({ data }: { data: PostDetailData }) {
  if (!data.analytics || data.analytics.state !== "ok") {
    return <AnalyticsStateNotice state={data.analytics?.state ?? "unposted"} />;
  }
  return (
    <div className="space-y-5">
      {data.score && (
        <PerformanceScoreCard
          score={data.score.score}
          percentile={data.score.percentile}
          sampleSize={data.sampleSize}
        />
      )}
      <PostAnalyticsMetrics
        totals={data.analytics.totals}
        baseline={data.baseline ?? undefined}
      />
      <InsightsCard insights={data.insights} />
      <EngagementTrendCard series={data.series} />
      <PostEngagementChart platforms={data.analytics.platforms} />
      <div className="grid gap-4 lg:grid-cols-2">
        <EngagementMixCard totals={data.analytics.totals} />
        <PlatformBreakdownCard platforms={data.analytics.platforms} />
      </div>
    </div>
  );
}
