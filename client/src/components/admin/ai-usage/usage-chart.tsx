"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig,
} from "@/components/ui/chart";
import type { AiUsagePoint } from "@/types/admin-ai-usage";

const CONFIG = {
  drafts:       { label: "Drafts", color: "var(--chart-1)" },
  images:       { label: "Images", color: "var(--chart-2)" },
  failedImages: { label: "Failed images", color: "var(--chart-5)" },
} satisfies ChartConfig;

const KEYS = ["drafts", "images", "failedImages"] as const;

function tick(iso: string): string {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" })
    .format(new Date(`${iso}T00:00:00Z`));
}
function label(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short", month: "short", day: "numeric",
  }).format(new Date(`${iso}T00:00:00Z`));
}

export function UsageChart({ data }: { data: AiUsagePoint[] }) {
  return (
    <ChartContainer config={CONFIG} className="aspect-auto h-[260px] w-full">
      <AreaChart data={data} margin={{ left: 4, right: 8, top: 8 }}>
        <defs>
          {KEYS.map((k) => (
            <linearGradient key={k} id={`au-${k}`} x1="0" y1="0" x2="0" y2="1">
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
            stroke={`var(--color-${k})`} strokeWidth={2} fill={`url(#au-${k})`} />
        ))}
      </AreaChart>
    </ChartContainer>
  );
}
