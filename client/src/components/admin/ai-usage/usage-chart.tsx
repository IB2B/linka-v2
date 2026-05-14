"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig,
} from "@/components/ui/chart";
import type { AiUsagePoint } from "@/types/admin-ai-usage";

const CONFIG = {
  drafts: { label: "Drafts", color: "#6366f1" },
  posted: { label: "Posted", color: "#10b981" },
  failed: { label: "Failed", color: "#f43f5e" },
} satisfies ChartConfig;

const ALL_KEYS = ["drafts", "posted", "failed"] as const;
type Key = typeof ALL_KEYS[number];

function tick(iso: string): string {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" })
    .format(new Date(`${iso}T00:00:00Z`));
}
function label(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short", month: "short", day: "numeric",
  }).format(new Date(`${iso}T00:00:00Z`));
}

type Props = { data: AiUsagePoint[]; activeKeys?: Key[] };

export function UsageChart({ data, activeKeys = [...ALL_KEYS] }: Props) {
  return (
    <ChartContainer config={CONFIG} className="aspect-auto h-[260px] w-full">
      <AreaChart data={data} margin={{ left: 4, right: 8, top: 8 }}>
        <defs>
          {ALL_KEYS.map((k) => (
            <linearGradient key={k} id={`au-${k}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={`var(--color-${k})`} stopOpacity={0.4} />
              <stop offset="95%" stopColor={`var(--color-${k})`} stopOpacity={0.05} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8}
          minTickGap={32} tickFormatter={tick} />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} width={32}
          allowDecimals={false} />
        <ChartTooltip cursor={{ strokeDasharray: "3 3" }}
          content={<ChartTooltipContent indicator="dot" labelFormatter={label} />} />
        {ALL_KEYS.filter((k) => activeKeys.includes(k)).map((k) => (
          <Area key={k} dataKey={k} type="monotone"
            stroke={`var(--color-${k})`} strokeWidth={2} fill={`url(#au-${k})`} />
        ))}
      </AreaChart>
    </ChartContainer>
  );
}
