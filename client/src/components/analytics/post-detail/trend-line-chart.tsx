"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig,
} from "@/components/ui/chart";
import type { PostMetrics, PostSnapshot } from "@/types/analytics";

type Series = { key: keyof PostMetrics; label: string; color: string };

function tick(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    month: "short", day: "numeric",
  });
}
function label(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    month: "short", day: "numeric", hour: "numeric", minute: "2-digit",
  });
}

export function TrendLineChart({
  snapshots, series,
}: { snapshots: PostSnapshot[]; series: Series[] }) {
  const data = snapshots.map((s) => ({
    t: s.fetchedAt,
    likes: s.metrics.likes,
    comments: s.metrics.comments,
    shares: s.metrics.shares,
    views: s.metrics.views,
  }));
  const config = Object.fromEntries(
    series.map((s) => [s.key, { label: s.label, color: s.color }]),
  ) satisfies ChartConfig;
  return (
    <ChartContainer config={config} className="aspect-auto h-64 w-full">
      <AreaChart data={data} margin={{ left: 4, right: 8, top: 8, bottom: 0 }}>
        <defs>
          {series.map((s) => (
            <linearGradient key={String(s.key)} id={`et-${String(s.key)}`}
              x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={s.color} stopOpacity={0.28} />
              <stop offset="95%" stopColor={s.color} stopOpacity={0.02} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="t" tickLine={false} axisLine={false} tickMargin={8}
          minTickGap={48} tickFormatter={tick} />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} width={32}
          allowDecimals={false} />
        <ChartTooltip cursor={{ strokeDasharray: "3 3" }}
          content={<ChartTooltipContent indicator="dot" labelFormatter={label} />} />
        {series.map((s) => (
          <Area key={String(s.key)} dataKey={String(s.key)} type="monotone"
            stroke={s.color} strokeWidth={2}
            fill={`url(#et-${String(s.key)})`}
            activeDot={{ r: 3 }} dot={false} isAnimationActive={false} />
        ))}
      </AreaChart>
    </ChartContainer>
  );
}
