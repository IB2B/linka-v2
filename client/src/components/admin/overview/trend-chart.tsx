"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig,
} from "@/components/ui/chart";
import type { SeriesPoint } from "@/lib/admin/get-series";

const CONFIG = {
  signups: { label: "Signups", color: "var(--chart-1)" },
  posts:   { label: "Posts",   color: "var(--chart-2)" },
} satisfies ChartConfig;

function tick(iso: string): string {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" })
    .format(new Date(`${iso}T00:00:00Z`));
}

function label(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short", month: "short", day: "numeric",
  }).format(new Date(`${iso}T00:00:00Z`));
}

export function TrendChart({ data }: { data: SeriesPoint[] }) {
  return (
    <ChartContainer config={CONFIG} className="aspect-auto h-[220px] w-full">
      <AreaChart data={data} margin={{ left: 4, right: 8, top: 8 }}>
        <defs>
          <linearGradient id="fill-signups" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-signups)" stopOpacity={0.4} />
            <stop offset="95%" stopColor="var(--color-signups)" stopOpacity={0.05} />
          </linearGradient>
          <linearGradient id="fill-posts" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-posts)" stopOpacity={0.4} />
            <stop offset="95%" stopColor="var(--color-posts)" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8}
          minTickGap={32} tickFormatter={tick} />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} width={32} />
        <ChartTooltip cursor={{ strokeDasharray: "3 3" }}
          content={<ChartTooltipContent indicator="dot" labelFormatter={label} />} />
        <Area dataKey="signups" type="monotone" stroke="var(--color-signups)"
          strokeWidth={2} fill="url(#fill-signups)" />
        <Area dataKey="posts" type="monotone" stroke="var(--color-posts)"
          strokeWidth={2} fill="url(#fill-posts)" />
      </AreaChart>
    </ChartContainer>
  );
}
