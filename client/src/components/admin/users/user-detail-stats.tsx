import type { AdminUserDetail } from "@/types/admin";

const fmt = new Intl.NumberFormat("en-US");

type Item = { label: string; value: number };

export function UserDetailStats({ stats }: { stats: AdminUserDetail["stats"] }) {
  const items: Item[] = [
    { label: "Generated",      value: stats.generated },
    { label: "Published",      value: stats.published },
    { label: "Failed",         value: stats.failed },
    { label: "Last 30 days",   value: stats.last30d },
  ];
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-border ring-1 ring-border sm:grid-cols-4">
      {items.map((i) => (
        <div key={i.label} className="flex flex-col gap-1 bg-card px-4 py-3">
          <span className="text-[11px] tracking-tight text-muted-foreground">
            {i.label}
          </span>
          <span className="text-xl font-semibold tabular-nums tracking-tight">
            {fmt.format(i.value)}
          </span>
        </div>
      ))}
    </div>
  );
}
