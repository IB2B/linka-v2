import { Calendar, FileText, Sparkles, Users } from "lucide-react";

import type { Stat } from "@/components/dashboard/stat-grid";

export const ADMIN_STATS: readonly Stat[] = [
  { label: "Drafts", value: "0", icon: FileText },
  { label: "Scheduled", value: "0", icon: Calendar },
  { label: "Generated this month", value: "0", icon: Sparkles },
  { label: "Active users", value: "—", icon: Users },
];
