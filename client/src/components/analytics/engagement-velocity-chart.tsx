"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig,
} from "@/components/ui/chart";
import type { DailyEngagementRow } from "@/lib/analytics/get-daily-engagement";

const COLORS = {
  likes: "#6366f1",
  comments: "#f59e0b",
  views: "#10b981",
} as const;

const CONFIG: ChartConfig = {
  likes: { label: "Likes", color: COLORS.likes },
  comments: { label: "Comments", color: COLORS.comments },
  views: { label: "Views", color: COLORS.views },
};

function tick(s: string) {
  return new Date(s).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export function EngagementVelocityChart({ series }: { series: DailyEngagementRow[] }) {
  const hasData = series.some((d) => d.likes + d.comments + d.views > 0);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Engagement velocity</CardTitle>
        <CardDescription>Daily likes, comments and views across all posted content.</CardDescription>
      </CardHeader>
      <CardContent>
        {!hasData ? (
          <p className="text-sm text-muted-foreground">No engagement data yet — publish some posts first.</p>
        ) : (
          <ChartContainer config={CONFIG} className="aspect-auto h-56 w-full">
            <AreaChart data={series} margin={{ left: 4, right: 8, top: 8, bottom: 0 }}>
              <defs>
                {(["likes", "comments", "views"] as const).map((k) => (
                  <linearGradient key={k} id={`ev-${k}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS[k]} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={COLORS[k]} stopOpacity={0.02} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="date" tickLine={false} axisLine={false}
                tickMargin={8} minTickGap={40} tickFormatter={tick} />
              <YAxis tickLine={false} axisLine={false} width={32} allowDecimals={false} />
              <ChartTooltip content={<ChartTooltipContent indicator="dot" labelFormatter={tick as any} />} />
              {(["likes", "comments", "views"] as const).map((k) => (
                <Area key={k} dataKey={k} type="monotone"
                  stroke={COLORS[k]} strokeWidth={2}
                  fill={`url(#ev-${k})`} dot={false} isAnimationActive={false} />
              ))}
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
