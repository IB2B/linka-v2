"use client";

import { useState } from "react";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { TrendLineChart } from "./trend-line-chart";
import { TrendLegend } from "./trend-legend";
import { TREND_SERIES } from "./trend-series";
import type { PostSnapshot } from "@/types/analytics";

export function EngagementTrendCard({
  series,
}: { series: PostSnapshot[] }) {
  const [hidden, setHidden] = useState<Set<string>>(new Set());
  if (series.length === 0) return null;
  const visible = TREND_SERIES.filter((s) => !hidden.has(s.key as string));
  const toggle = (k: string) => {
    setHidden((prev) => {
      const next = new Set(prev);
      if (next.has(k)) next.delete(k); else next.add(k);
      return next;
    });
  };
  return (
    <Card>
      <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-2">
        <div>
          <CardTitle>Engagement over time</CardTitle>
          <CardDescription>
            Cumulative likes, comments and shares since publish.
          </CardDescription>
        </div>
        <TrendLegend
          items={TREND_SERIES.map((s) => ({ ...s, key: s.key as string }))}
          hidden={hidden} onToggle={toggle}
        />
      </CardHeader>
      <CardContent>
        <TrendLineChart snapshots={series} series={visible} />
      </CardContent>
    </Card>
  );
}
