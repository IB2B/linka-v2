import { ActivityChart } from "./activity-chart";
import { AnalyticsStatsRow } from "./analytics-stats";
import { BreakdownCard } from "./breakdown-card";
import { InsightsCard } from "./insights-card";
import { RecentPostsTable } from "./recent-posts-table";
import type { Analytics } from "@/lib/analytics/analytics.types";
import type { PostMetrics } from "@/types/analytics";

export function AnalyticsView({
  data, metrics, published,
}: {
  data: Analytics;
  metrics: Map<string, PostMetrics>;
  published: Map<string, string[]>;
}) {
  return (
    <div className="space-y-6">
      <AnalyticsStatsRow stats={data.stats} />
      <InsightsCard insights={data.insights} />
      <ActivityChart daily={data.daily} />
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
      <RecentPostsTable
        posts={data.recent} metrics={metrics} published={published}
      />
    </div>
  );
}
