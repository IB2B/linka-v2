import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { BreakdownRow } from "./breakdown-row";
import type { AnalyticsBucket } from "@/lib/analytics/analytics.types";

type BreakdownCardProps = {
  title: string;
  description: string;
  buckets: AnalyticsBucket[];
  emptyMessage: string;
};

export function BreakdownCard({
  title, description, buckets, emptyMessage,
}: BreakdownCardProps) {
  const total = buckets.reduce((sum, b) => sum + b.count, 0);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {total === 0 ? (
          <p className="text-sm text-muted-foreground">{emptyMessage}</p>
        ) : (
          buckets.map((b) => (
            <BreakdownRow
              key={b.key} label={b.label} count={b.count} total={total}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
}
