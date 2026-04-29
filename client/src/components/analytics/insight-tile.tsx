import type { LucideIcon } from "lucide-react";

type InsightTileProps = {
  icon: LucideIcon;
  label: string;
  value: string;
  hint?: string;
};

export function InsightTile({
  icon: Icon, label, value, hint,
}: InsightTileProps) {
  return (
    <div className="flex items-start gap-3 rounded-lg border bg-card p-4">
      <div className="rounded-md bg-muted p-2 text-muted-foreground">
        <Icon className="size-4" />
      </div>
      <div className="min-w-0 flex-1 space-y-0.5">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <p className="truncate text-base font-semibold">{value}</p>
        {hint ? (
          <p className="text-xs text-muted-foreground">{hint}</p>
        ) : null}
      </div>
    </div>
  );
}
