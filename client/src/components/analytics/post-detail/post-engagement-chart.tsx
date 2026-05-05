"use client";

import { useState } from "react";

import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlatformBar } from "./platform-bar";
import { CHART_METRICS, type ChartMetric } from "./chart-metrics";
import type { PlatformBreakdown } from "@/types/analytics";

export function PostEngagementChart({
  platforms,
}: { platforms: PlatformBreakdown[] }) {
  const [metric, setMetric] = useState<ChartMetric>("views");
  const max = platforms.reduce(
    (m, p) => Math.max(m, p.metrics[metric]), 0,
  );
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-2">
        <div>
          <CardTitle>Engagement by platform</CardTitle>
          <CardDescription>
            Compare {metric} across the platforms this post hit.
          </CardDescription>
        </div>
        <div className="flex flex-wrap gap-1">
          {CHART_METRICS.map((m) => (
            <Button
              key={m.key} size="sm"
              variant={metric === m.key ? "default" : "outline"}
              onClick={() => setMetric(m.key)}
            >
              {m.label}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        {platforms.length === 0 ? (
          <p className="text-sm text-muted-foreground">No platform data.</p>
        ) : (
          <div className="flex flex-wrap items-end justify-around gap-6">
            {platforms.map((p) => (
              <PlatformBar
                key={p.platform} label={p.platform}
                value={p.metrics[metric]} max={max}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
