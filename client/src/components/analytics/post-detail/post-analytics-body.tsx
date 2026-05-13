"use client";

import { useState } from "react";
import { PostAnalyticsMetrics } from "./post-analytics-metrics";
import { PerformanceScoreCard } from "./performance-score-card";
import { EngagementTrendCard } from "./engagement-trend-card";
import { PostEngagementChart } from "./post-engagement-chart";
import { EngagementMixCard } from "./engagement-mix-card";
import { InsightsCard } from "./insights-card";
import { PlatformBreakdownCard } from "./platform-breakdown-card";
import { LifecycleCard } from "./lifecycle-card";
import { AnalyticsStateNotice } from "./analytics-state-notice";
import { PlatformPicker } from "./platform-picker";
import type { PostDetailData } from "@/lib/analytics/load-post-detail";
import type { PlatformBreakdown } from "@/types/analytics";

export function PostAnalyticsBody({ data }: { data: PostDetailData }) {
  const [selected, setSelected] = useState("all");

  if (!data.analytics || data.analytics.state !== "ok") {
    return <AnalyticsStateNotice state={data.analytics?.state ?? "unposted"} />;
  }

  const { platforms, totals } = data.analytics;
  const okPlatforms = platforms.filter((p) => p.status === "ok");
  const platformNames = platforms.map((p) => p.platform);

  const activePlatform: PlatformBreakdown | undefined =
    selected !== "all" ? okPlatforms.find((p) => p.platform === selected) : undefined;

  const metrics = activePlatform ? activePlatform.metrics : totals;
  const visiblePlatforms = activePlatform ? [activePlatform] : platforms;

  return (
    <div className="space-y-6">
      <PlatformPicker
        platforms={platformNames}
        selected={selected}
        onChange={setSelected}
      />
      <PostAnalyticsMetrics totals={metrics} baseline={data.baseline ?? undefined} />
      {selected === "all" && data.score && (
        <PerformanceScoreCard
          score={data.score.score}
          percentile={data.score.percentile}
          sampleSize={data.sampleSize}
        />
      )}
      <EngagementTrendCard series={data.series} />
      <div className="grid gap-4 md:grid-cols-2">
        {selected === "all" && (
          <PostEngagementChart platforms={platforms} />
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
