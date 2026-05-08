import { KpiTile } from "@/components/admin/kpi-tile";
import type { ActivitySummary } from "@/types/admin";

export function ActivitySummaryCards({ summary }: { summary: ActivitySummary }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <KpiTile label="Events" window={summary.events} />
      <KpiTile label="Signups" window={summary.signups} />
      <KpiTile label="Posts" window={summary.posts} />
      <KpiTile label="Failures" window={summary.failures} polarity="up-bad" />
    </div>
  );
}
