import { CalendarHeart, Image, Repeat2, Trophy } from "lucide-react";

import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { InsightTile } from "./insight-tile";
import type { AnalyticsInsights } from "@/lib/analytics/analytics.types";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    weekday: "short", month: "short", day: "numeric",
  });
}

export function InsightsCard({ insights }: { insights: AnalyticsInsights }) {
  const { bestDay, avgPerDay, topPlatform, imageAttachRate } = insights;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Insights</CardTitle>
        <CardDescription>Highlights from the selected window.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <InsightTile
          icon={Trophy}
          label="Most active day"
          value={bestDay ? formatDate(bestDay.date) : "—"}
          hint={bestDay ? `${bestDay.count} posts created` : "No activity yet"}
        />
        <InsightTile
          icon={Repeat2}
          label="Avg per day"
          value={avgPerDay.toString()}
          hint="Across the chart window"
        />
        <InsightTile
          icon={CalendarHeart}
          label="Top platform"
          value={topPlatform?.label ?? "—"}
          hint={topPlatform ? `${topPlatform.count} posts` : "Set platforms when generating"}
        />
        <InsightTile
          icon={Image}
          label="With image"
          value={`${imageAttachRate}%`}
          hint="Posts that include an AI image"
        />
      </CardContent>
    </Card>
  );
}
