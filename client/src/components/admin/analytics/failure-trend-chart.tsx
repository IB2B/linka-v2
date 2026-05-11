"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig,
} from "@/components/ui/chart";
import type { AnalyticsPoint } from "@/types/admin-analytics";

const CONFIG = {
  published: { label: "Published", color: "var(--chart-2)" },
  failed:    { label: "Failed",    color: "var(--chart-5)" },
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

export function FailureTrendChart({ data }: { data: AnalyticsPoint[] }) {
  return (
    <ChartContainer config={CONFIG} className="aspect-auto h-[200px] w-full">
      <BarChart data={data} margin={{ left: 4, right: 8, top: 8 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8}
          minTickGap={32} tickFormatter={tick} />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} width={32} />
        <ChartTooltip cursor={{ fill: "var(--muted)", opacity: 0.4 }}
          content={<ChartTooltipContent indicator="dot" labelFormatter={label} />} />
        <Bar dataKey="published" stackId="s" fill="var(--color-published)" radius={[0, 0, 0, 0]} />
        <Bar dataKey="failed" stackId="s" fill="var(--color-failed)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  );
}
