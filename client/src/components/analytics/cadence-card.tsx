"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig,
} from "@/components/ui/chart";
import type { CadencePoint, CadenceInsight } from "@/lib/analytics/compute-cadence";

const CONFIG: ChartConfig = {
  totalEngagement: { label: "Engagement", color: "#6366f1" },
};

export function CadenceCard({
  points, insight,
}: {
  points: CadencePoint[];
  insight: CadenceInsight | null;
}) {
  const hasData = points.some((p) => p.postsPosted > 0);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Posting cadence</CardTitle>
        <CardDescription>
          Daily engagement vs how many posts you published that day.
          {insight && (
            <span className="ml-1 font-medium text-foreground">
              Best: {insight.optimalPostsPerDay} post{insight.optimalPostsPerDay !== 1 ? "s" : ""}/day
              → ~{insight.avgEngagementAtOptimal.toLocaleString()} engagements.
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!hasData ? (
          <p className="text-sm text-muted-foreground">No posted content yet.</p>
        ) : (
          <ChartContainer config={CONFIG} className="aspect-auto h-52 w-full">
            <BarChart data={points} margin={{ left: 4, right: 8, top: 8, bottom: 0 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8}
                minTickGap={40}
                tickFormatter={(s) => new Date(s).toLocaleDateString(undefined, { month: "short", day: "numeric" })} />
              <YAxis tickLine={false} axisLine={false} width={32} allowDecimals={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="totalEngagement" fill="#6366f1"
                radius={[3, 3, 0, 0]} isAnimationActive={false} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
