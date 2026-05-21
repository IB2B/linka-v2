"use client";

import { useEffect, useState } from "react";
import { PostAnalyticsMetrics } from "./post-analytics-metrics";
import { PerformanceScoreCard } from "./performance-score-card";
import { EngagementTrendCard } from "./engagement-trend-card";
import { PostEngagementChart } from "./post-engagement-chart";
import { EngagementMixCard } from "./engagement-mix-card";
import { InsightsCard } from "./insights-card";
import { PlatformBreakdownCard } from "./platform-breakdown-card";
import { LifecycleCard } from "./lifecycle-card";
import { AnalyticsStateNotice } from "./analytics-state-notice";
import { EngagementSyncNotice } from "./engagement-sync-notice";
import { PlatformPicker } from "./platform-picker";
import type { PostDetailData } from "@/lib/analytics/load-post-detail";
import type { PlatformBreakdown } from "@/types/analytics";

export function PostAnalyticsBody({ data }: { data: PostDetailData }) {
  const [selected, setSelected] = useState("all");

  if (!data.analytics || data.analytics.state !== "ok") {
    return <AnalyticsStateNotice state={data.analytics?.state ?? "unposted"} />;
  }

  const { platforms, totals } = data.analytics;
  const allowed = new Set(
    data.post.scheduledPlatforms?.length
      ? data.post.scheduledPlatforms
      : data.post.platform ? [data.post.platform] : platforms.map((p) => p.platform),
  );
  const scopedPlatforms = platforms.filter((p) => allowed.has(p.platform));
  const okPlatforms = scopedPlatforms.filter((p) => p.status === "ok");
  const platformNames = okPlatforms.map((p) => p.platform);

  const isStaleSelection = selected !== "all" && !platformNames.includes(selected);
  useEffect(() => {
    if (isStaleSelection) setSelected("all");
  }, [isStaleSelection]);

  const activePlatform: PlatformBreakdown | undefined =
    selected !== "all" ? okPlatforms.find((p) => p.platform === selected) : undefined;

  const metrics = activePlatform ? activePlatform.metrics : totals;
  const visiblePlatforms = activePlatform ? [activePlatform] : scopedPlatforms;

  return (
    <div className="space-y-6">
      <PlatformPicker platforms={platformNames} selected={selected} onChange={setSelected} />
      <EngagementSyncNotice totals={metrics} platforms={visiblePlatforms.map((p) => p.platform)} />
      <PostAnalyticsMetrics
        totals={metrics}
        baseline={
          data.sampleSize >= 3 && metrics.impressions >= 30 ? data.baseline ?? undefined : undefined
        }
      />
      {selected === "all" && data.score && data.sampleSize >= 5 && (
        <PerformanceScoreCard
          score={data.score.score}
          percentile={data.score.percentile}
          sampleSize={data.sampleSize}
        />
      )}
      {metrics.likes + metrics.comments + metrics.shares > 0 && (
        <EngagementTrendCard series={data.series} />
      )}
      <div className="grid gap-4 md:grid-cols-2">
        {selected === "all" && scopedPlatforms.length > 1 && (
          <PostEngagementChart platforms={scopedPlatforms} />
        )}
        <EngagementMixCard totals={metrics} />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <InsightsCard insights={data.insights} />
        <PlatformBreakdownCard platforms={visiblePlatforms} />
        <LifecycleCard post={data.post} />
      </div>
    </div>
  );
}
