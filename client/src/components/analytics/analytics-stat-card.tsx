import type { LucideIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatDelta } from "./stat-delta";
import type { AnalyticsDelta } from "@/lib/analytics/analytics.types";

type AnalyticsStatCardProps = {
  label: string;
  delta: AnalyticsDelta;
  icon: LucideIcon;
};

export function AnalyticsStatCard({
  label, delta, icon: Icon,
}: AnalyticsStatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {label}
        </CardTitle>
        <Icon className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        <div className="text-2xl font-semibold tabular-nums">
          {delta.current.toLocaleString()}
        </div>
        <StatDelta delta={delta} />
      </CardContent>
    </Card>
  );
}
