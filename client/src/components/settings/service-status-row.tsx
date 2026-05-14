import { cn } from "@/lib/utils";
import type { ServiceStatus } from "@/app/dashboard/settings/services-action";

const STATUS_CONFIG: Record<ServiceStatus, { label: string; dot: string }> = {
  ok:            { label: "Operational",   dot: "bg-emerald-500" },
  degraded:      { label: "Degraded",      dot: "bg-amber-400" },
  down:          { label: "Outage",        dot: "bg-red-500" },
  unconfigured:  { label: "Not configured", dot: "bg-muted-foreground/30" },
};

type Props = {
  name: string;
  description: string;
  status: ServiceStatus;
};

export function ServiceStatusRow({ name, description, status }: Props) {
  const cfg = STATUS_CONFIG[status];
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="min-w-0">
        <p className="text-sm font-medium">{name}</p>
        <p className="text-xs text-muted-foreground truncate">{description}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className={cn("size-2 rounded-full", cfg.dot, status === "ok" && "animate-pulse")} />
        <span className={cn(
          "text-xs font-medium",
          status === "ok" && "text-emerald-600 dark:text-emerald-400",
          status === "degraded" && "text-amber-600 dark:text-amber-400",
          status === "down" && "text-red-600 dark:text-red-400",
          status === "unconfigured" && "text-muted-foreground",
        )}>
          {cfg.label}
        </span>
      </div>
    </div>
  );
}
