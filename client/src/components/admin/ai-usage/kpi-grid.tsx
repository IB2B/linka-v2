import { DeltaBadge } from "@/components/admin/overview/delta-badge";

export type KpiItem = {
  label: string;
  value: string;
  delta?: { curr: number; prev: number };
  note?: string;
};

export function KpiGrid({ items }: { items: KpiItem[] }) {
  return (
    <div className="grid grid-cols-2 divide-y divide-x md:grid-cols-4 md:divide-y-0">
      {items.map((s) => (
        <div key={s.label} className="flex flex-col gap-1.5 px-5 py-5">
          <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            {s.label}
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-3xl font-semibold tabular-nums tracking-tight">
              {s.value}
            </span>
            {s.delta && <DeltaBadge curr={s.delta.curr} prev={s.delta.prev} />}
          </div>
          {s.note && (
            <span className="text-[11px] tracking-tight text-muted-foreground">{s.note}</span>
          )}
        </div>
      ))}
    </div>
  );
}
