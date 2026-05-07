"use client";

import {
  Area, AreaChart, CartesianGrid, XAxis, YAxis,
} from "recharts";

import {
  ChartContainer, ChartLegend, ChartLegendContent,
  ChartTooltip, ChartTooltipContent, type ChartConfig,
} from "@/components/ui/chart";
import type { EngagementDay } from "@/lib/dashboard/engagement.types";

const CONFIG = {
  likes: { label: "Likes", color: "var(--chart-1)" },
  comments: { label: "Comments", color: "var(--chart-2)" },
  views: { label: "Views", color: "var(--chart-3)" },
  impressions: { label: "Impressions", color: "var(--chart-4)" },
} satisfies ChartConfig;

const KEYS = ["likes", "comments", "views", "impressions"] as const;

function formatTick(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return new Intl.DateTimeFormat("en-US", {
    month: "short", day: "numeric", timeZone: "UTC",
  }).format(d);
}

function formatLabel(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short", month: "short", day: "numeric", year: "numeric", timeZone: "UTC",
  }).format(d);
}

export function EngagementChart({ data }: { data: EngagementDay[] }) {
  return (
    <ChartContainer config={CONFIG} className="aspect-auto h-[260px] w-full">
      <AreaChart data={data} margin={{ left: 8, right: 8, top: 8 }}>
        <defs>
          {KEYS.map((k) => (
            <linearGradient key={k} id={`fill-${k}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={`var(--color-${k})`} stopOpacity={0.4} />
              <stop offset="95%" stopColor={`var(--color-${k})`} stopOpacity={0.05} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8}
          minTickGap={32} tickFormatter={formatTick} />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} width={40} />
        <ChartTooltip cursor={{ strokeDasharray: "3 3" }}
          content={<ChartTooltipContent indicator="dot" labelFormatter={formatLabel} />} />
        {KEYS.map((k) => (
          <Area key={k} dataKey={k} type="monotone" stackId={undefined}
            stroke={`var(--color-${k})`} strokeWidth={2}
            fill={`url(#fill-${k})`} />
        ))}
        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  );
}
