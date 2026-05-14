"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig,
} from "@/components/ui/chart";
import type { RevenuePoint } from "@/lib/admin/get-revenue";

const CONFIG = {
  revenue: { label: "Revenue", color: "#6366f1" },
} satisfies ChartConfig;

function tick(iso: string): string {
  return new Intl.DateTimeFormat("en-US", { month: "short", year: "2-digit" })
    .format(new Date(`${iso}-01T00:00:00Z`));
}

function fmt(val: number): string {
  return val >= 1000 ? `$${(val / 1000).toFixed(1)}k` : `$${val}`;
}

export function RevenueChart({ data }: { data: RevenuePoint[] }) {
  return (
    <ChartContainer config={CONFIG} className="aspect-auto h-[220px] w-full">
      <BarChart data={data} margin={{ left: 4, right: 8, top: 8 }}>
        <defs>
          <linearGradient id="rev-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#6366f1" stopOpacity={0.5} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="month" tickLine={false} axisLine={false}
          tickMargin={8} tickFormatter={tick} />
        <YAxis tickLine={false} axisLine={false} tickMargin={8}
          width={44} tickFormatter={fmt} />
        <ChartTooltip
          cursor={{ fill: "var(--muted)", opacity: 0.4 }}
          content={
            <ChartTooltipContent
              indicator="dot"
              labelFormatter={tick}
              formatter={(v) => [`$${Number(v).toLocaleString()}`, "Revenue"]}
            />
          }
        />
        <Bar dataKey="revenue" fill="url(#rev-fill)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  );
}
