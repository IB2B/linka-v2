import type { LucideIcon } from "lucide-react";

type Props = {
  label: string;
  value: string;
  icon: LucideIcon;
  tone?: "default" | "success" | "warning" | "muted";
};

const TONE: Record<NonNullable<Props["tone"]>, string> = {
  default: "text-foreground",
  success: "text-emerald-600 dark:text-emerald-400",
  warning: "text-amber-600 dark:text-amber-400",
  muted:   "text-muted-foreground",
};

export function KpiPill({ label, value, icon: Icon, tone = "default" }: Props) {
  return (
    <div className="flex items-center gap-3 rounded-lg border bg-background/60 px-4 py-3">
      <div className="grid size-8 place-items-center rounded-md bg-muted">
        <Icon className={`size-4 ${TONE[tone]}`} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </div>
        <div className="text-lg font-semibold tabular-nums tracking-tight">
          {value}
        </div>
      </div>
    </div>
  );
}
