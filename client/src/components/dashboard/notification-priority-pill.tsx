import { cn } from "@/lib/utils";
import type { NotificationPriority } from "./notifications-data";

const STYLES: Record<NotificationPriority, string | null> = {
  urgent: "bg-destructive/15 text-destructive",
  high: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  normal: null,
  low: null,
};

const LABELS: Record<NotificationPriority, string> = {
  urgent: "Urgent", high: "High", normal: "", low: "",
};

export function NotificationPriorityPill({ priority }: { priority?: NotificationPriority }) {
  if (!priority) return null;
  const style = STYLES[priority];
  if (!style) return null;
  return (
    <span
      className={cn(
        "rounded px-1.5 py-px text-[9px] font-semibold uppercase leading-tight tracking-wide",
        style,
      )}
    >
      {LABELS[priority]}
    </span>
  );
}
