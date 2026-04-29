import { Calendar, CheckCircle2, FileText, Sparkles } from "lucide-react";

import type { Stat } from "@/components/dashboard/stat-grid";
import type { DashboardCounts } from "./build-overview";

export function buildStats(c: DashboardCounts): readonly Stat[] {
  return [
    { label: "Drafts", value: String(c.drafts), icon: FileText },
    { label: "Scheduled", value: String(c.scheduled), icon: Calendar },
    { label: "Posted", value: String(c.posted), icon: CheckCircle2 },
    { label: "Generated", value: String(c.totalGenerated), icon: Sparkles },
  ];
}
