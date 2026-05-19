import { Calendar, CheckCircle2, FileText, Sparkles } from "lucide-react";

import type { Stat } from "@/components/dashboard/stat-grid";
import type { DashboardCounts } from "./build-overview";

type Translate = (key: "drafts" | "scheduled" | "posted" | "generated") => string;

export function buildStats(c: DashboardCounts, t: Translate): readonly Stat[] {
  return [
    { label: t("drafts"), value: String(c.drafts), icon: FileText },
    { label: t("scheduled"), value: String(c.scheduled), icon: Calendar },
    { label: t("posted"), value: String(c.posted), icon: CheckCircle2 },
    { label: t("generated"), value: String(c.totalGenerated), icon: Sparkles },
  ];
}
