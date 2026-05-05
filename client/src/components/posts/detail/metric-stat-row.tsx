import type { LucideIcon } from "lucide-react";

export function MetricStatRow({
  label, icon: Icon, value,
}: { label: string; icon: LucideIcon; value: number }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="flex items-center gap-2 text-muted-foreground">
        <Icon className="size-3.5" />
        {label}
      </span>
      <span className="font-medium tabular-nums">
        {value.toLocaleString()}
      </span>
    </div>
  );
}
