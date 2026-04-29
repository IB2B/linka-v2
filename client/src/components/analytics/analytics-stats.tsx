import { CalendarClock, FileText, Send, Sparkles } from "lucide-react";

import { AnalyticsStatCard } from "./analytics-stat-card";
import type { AnalyticsStats } from "@/lib/analytics/analytics.types";

export function AnalyticsStatsRow({ stats }: { stats: AnalyticsStats }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <AnalyticsStatCard label="Total posts" delta={stats.total} icon={FileText} />
      <AnalyticsStatCard label="Drafts" delta={stats.drafts} icon={Sparkles} />
      <AnalyticsStatCard
        label="Scheduled" delta={stats.scheduled} icon={CalendarClock}
      />
      <AnalyticsStatCard label="Posted" delta={stats.posted} icon={Send} />
    </div>
  );
}
