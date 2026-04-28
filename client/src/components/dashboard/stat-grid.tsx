import type { LucideIcon } from "lucide-react";

import { StatCard } from "@/components/dashboard/stat-card";

export type Stat = {
  label: string;
  value: string;
  icon: LucideIcon;
};

export function StatGrid({ stats }: { stats: readonly Stat[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard
          key={stat.label}
          label={stat.label}
          value={stat.value}
          icon={stat.icon}
        />
      ))}
    </div>
  );
}
