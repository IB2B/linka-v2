export type SpendSegment = { width: number; color: string; label?: string };

type Props = {
  icon: React.ReactNode;
  label: string;
  count: string;
  cost: string;
  segments: SpendSegment[];
};

export function SpendRow({ icon, label, count, cost, segments }: Props) {
  const hasLegend = segments.some((s) => s.label);
  return (
    <div className="space-y-2">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <span className="flex items-center gap-1.5 text-xs font-medium tracking-tight">
            {icon}
            {label}
          </span>
          <span className="text-[11px] tracking-tight text-muted-foreground">
            {count}
          </span>
        </div>
        <span className="font-heading text-base font-semibold tabular-nums tracking-tight">
          {cost}
        </span>
      </div>
      <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-muted">
        {segments.map((s, i) => (
          <span
            key={i}
            className={`block h-full ${s.color}`}
            style={{ width: `${s.width}%` }}
          />
        ))}
      </div>
      {hasLegend && (
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] tracking-tight text-muted-foreground">
          {segments.map((s, i) =>
            s.label ? (
              <span key={i} className="flex items-center gap-1">
                <span className={`size-1.5 rounded-full ${s.color}`} />
                {s.label}
              </span>
            ) : null,
          )}
        </div>
      )}
    </div>
  );
}
