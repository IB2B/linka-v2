import type { AdminUserDetail } from "@/types/admin";

const fmt = new Intl.NumberFormat("en-US");

type Item = { label: string; value: number };

export function UserDetailStats({ stats }: { stats: AdminUserDetail["stats"] }) {
  const items: Item[] = [
    { label: "Generated",    value: stats.generated },
    { label: "Published",    value: stats.published },
    { label: "Failed",       value: stats.failed },
    { label: "Last 30 days", value: stats.last30d },
  ];
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-border ring-1 ring-foreground/10 sm:grid-cols-4">
      {items.map((i) => (
        <div key={i.label} className="flex flex-col gap-0.5 bg-card px-3 py-2.5">
          <span className="text-[11px] tracking-tight text-muted-foreground">
            {i.label}
          </span>
          <span className="text-lg font-semibold tabular-nums tracking-tight">
            {fmt.format(i.value)}
          </span>
        </div>
      ))}
    </div>
  );
}
