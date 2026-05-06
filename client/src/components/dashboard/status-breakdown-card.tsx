import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { StatusDonut } from "./status-donut";
import type { DashboardCounts } from "@/lib/dashboard/build-overview";

export function StatusBreakdownCard({ counts }: { counts: DashboardCounts }) {
  const slices = [
    { label: "Posted", value: counts.posted, color: "#10b981" },
    { label: "Scheduled", value: counts.scheduled, color: "#6366f1" },
    { label: "Drafts", value: counts.drafts, color: "#f59e0b" },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Status breakdown</CardTitle>
        <CardDescription>
          {counts.totalGenerated} total · all time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <StatusDonut slices={slices} />
      </CardContent>
    </Card>
  );
}
