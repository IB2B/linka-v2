import { Card } from "@/components/ui/card";
import type { AdminUserDetail } from "@/types/admin";

const fmt = new Intl.NumberFormat("en-US");

type Props = { stats: AdminUserDetail["stats"] };

export function UserDetailStats({ stats }: Props) {
  const items = [
    { label: "Generated", value: fmt.format(stats.generated) },
    { label: "Published", value: fmt.format(stats.published) },
    { label: "Failed", value: fmt.format(stats.failed) },
    { label: "Last 30 days", value: fmt.format(stats.last30d) },
  ];
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {items.map((item) => (
        <Card key={item.label} size="sm" className="flex flex-col gap-0.5 py-4">
          <span className="text-xs font-medium tracking-tight text-muted-foreground">
            {item.label}
          </span>
          <span className="text-2xl font-semibold tabular-nums tracking-tight">
            {item.value}
          </span>
        </Card>
      ))}
    </div>
  );
}
