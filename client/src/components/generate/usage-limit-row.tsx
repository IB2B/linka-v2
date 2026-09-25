import { cn } from "@/lib/utils";

type Props = { label: string; used: number; limit: number; note?: React.ReactNode };

export function UsageLimitRow({ label, used, limit, note }: Props) {
  const left = Math.max(0, limit - used);
  const pct = limit > 0 ? Math.min(100, (used / limit) * 100) : 0;
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between gap-2 text-sm">
        <span className="font-medium">{label}</span>
        <span className={cn("tabular-nums text-muted-foreground", left === 0 && "text-destructive")}>
          {left} of {limit} left
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
        <div className={cn("h-full rounded-full bg-primary transition-all", left === 0 && "bg-destructive")}
          style={{ width: `${pct}%` }} />
      </div>
      {note ? <p className="text-xs text-muted-foreground">{note}</p> : null}
    </div>
  );
}
