import { cn } from "@/lib/utils";
import { TONE_BG, usagePct, usageTone } from "@/lib/usage/usage-tone";

type Props = {
  label: string;
  used: number;
  limit: number;
  note?: React.ReactNode;
  value?: string;
};

export function UsageLimitRow({ label, used, limit, note, value }: Props) {
  const left = Math.max(0, limit - used);
  const pct = usagePct(used, limit);
  const tone = usageTone(pct);
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between gap-2 text-sm">
        <span className="font-medium">{label}</span>
        <span className={cn("tabular-nums text-muted-foreground", tone === "danger" && "text-destructive")}>
          {value ?? `${left} of ${limit} left`}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
        <div className={cn("h-full rounded-full transition-all", TONE_BG[tone])}
          style={{ width: `${pct}%` }} />
      </div>
      {note ? <p className="text-xs text-muted-foreground">{note}</p> : null}
    </div>
  );
}
