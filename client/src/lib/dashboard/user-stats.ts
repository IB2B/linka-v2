import { Calendar, FileText, Image as ImageIcon, Sparkles } from "lucide-react";

import type { Stat } from "@/components/dashboard/stat-grid";

export const USER_STATS: readonly Stat[] = [
  { label: "Drafts", value: "0", icon: FileText },
  { label: "Scheduled", value: "0", icon: Calendar },
  { label: "Posts generated", value: "0", icon: Sparkles },
  { label: "Images generated", value: "0", icon: ImageIcon },
];
