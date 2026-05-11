import { Flame } from "lucide-react";
import type { SupportPriority } from "@/types/admin-support";

const STYLES: Record<SupportPriority, string> = {
  urgent: "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-300",
  high:   "border-orange-500/30 bg-orange-500/10 text-orange-700 dark:text-orange-300",
  normal: "border-border bg-muted text-foreground/80",
  low:    "border-border bg-background text-muted-foreground",
};

const LABEL: Record<SupportPriority, string> = {
  urgent: "Urgent", high: "High", normal: "Normal", low: "Low",
};

export function SupportPriorityBadge({ priority }: { priority: SupportPriority }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${STYLES[priority]}`}
    >
      {priority === "urgent" ? <Flame className="size-3" /> : null}
      {LABEL[priority]}
    </span>
  );
}
