import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { ActivityBar } from "./activity-bar";
import type { AnalyticsDaily } from "@/lib/analytics/analytics.types";

export function ActivityChart({ daily }: { daily: AnalyticsDaily[] }) {
  const max = daily.reduce((m, d) => Math.max(m, d.count), 0);
  const total = daily.reduce((s, d) => s + d.count, 0);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Generation activity</CardTitle>
        <CardDescription>
          Posts created over the last 14 days · {total} total
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-1.5">
          {daily.map((d) => (
            <ActivityBar
              key={d.date} date={d.date} count={d.count} max={max}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
