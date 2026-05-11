"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig,
} from "@/components/ui/chart";
import type { AnalyticsPoint } from "@/types/admin-analytics";

const CONFIG = {
  signups:   { label: "Signups",   color: "var(--chart-1)" },
  published: { label: "Published", color: "var(--chart-2)" },
  failed:    { label: "Failed",    color: "var(--chart-5)" },
} satisfies ChartConfig;

const KEYS = ["signups", "published", "failed"] as const;

function tick(iso: string): string {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" })
    .format(new Date(`${iso}T00:00:00Z`));
}
function label(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short", month: "short", day: "numeric",
  }).format(new Date(`${iso}T00:00:00Z`));
}

export function GrowthChart({ data }: { data: AnalyticsPoint[] }) {
  return (
    <ChartContainer config={CONFIG} className="aspect-auto h-[260px] w-full">
      <AreaChart data={data} margin={{ left: 4, right: 8, top: 8 }}>
        <defs>
          {KEYS.map((k) => (
            <linearGradient key={k} id={`g-${k}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={`var(--color-${k})`} stopOpacity={0.4} />
              <stop offset="95%" stopColor={`var(--color-${k})`} stopOpacity={0.05} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8}
          minTickGap={32} tickFormatter={tick} />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} width={32} />
        <ChartTooltip cursor={{ strokeDasharray: "3 3" }}
          content={<ChartTooltipContent indicator="dot" labelFormatter={label} />} />
        {KEYS.map((k) => (
          <Area key={k} dataKey={k} type="monotone"
            stroke={`var(--color-${k})`} strokeWidth={2} fill={`url(#g-${k})`} />
        ))}
      </AreaChart>
    </ChartContainer>
  );
}
