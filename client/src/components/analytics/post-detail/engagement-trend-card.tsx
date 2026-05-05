"use client";

import { useState } from "react";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { TrendLineChart } from "./trend-line-chart";
import { TrendLegend } from "./trend-legend";
import { TREND_SERIES } from "./trend-series";
import type { PostSnapshot } from "@/types/analytics";

function timeLabel(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    month: "short", day: "numeric", hour: "numeric", minute: "2-digit",
  });
}

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
  const first = timeLabel(series[0].fetchedAt);
  const last = timeLabel(series[series.length - 1].fetchedAt);
  return (
    <Card>
      <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-2">
        <div>
          <CardTitle>Engagement over time</CardTitle>
          <CardDescription>
            {series.length} snapshot{series.length === 1 ? "" : "s"} of likes, comments, and shares.
          </CardDescription>
        </div>
        <TrendLegend
          items={TREND_SERIES.map((s) => ({ ...s, key: s.key as string }))}
          hidden={hidden} onToggle={toggle}
        />
      </CardHeader>
      <CardContent>
        <TrendLineChart snapshots={series} series={visible} />
        <div className="mt-2 flex justify-between text-xs text-muted-foreground tabular-nums">
          <span>{first}</span>
          {series.length > 1 ? <span>{last}</span> : null}
        </div>
      </CardContent>
    </Card>
  );
}
