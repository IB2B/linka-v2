import { CreditCard, FileText, LifeBuoy, Users } from "lucide-react";

import { StatGrid, type Stat } from "@/components/dashboard/stat-grid";
import type { AdminStats } from "@/types/admin";

function fmt(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}

export function OverviewStats({ stats }: { stats: AdminStats }) {
  const items: Stat[] = [
    { label: "Total users", value: fmt(stats.users.total), icon: Users },
    { label: "New this week", value: fmt(stats.users.newThisWeek), icon: Users },
    { label: "Paying subscribers", value: fmt(stats.subscriptions.paying), icon: CreditCard },
    { label: "Posts this month", value: fmt(stats.posts.thisMonth), icon: FileText },
    { label: "Active users", value: fmt(stats.users.active), icon: Users },
    { label: "Suspended", value: fmt(stats.users.suspended), icon: Users },
    { label: "Free tier", value: fmt(stats.subscriptions.free), icon: CreditCard },
    { label: "Open tickets", value: fmt(stats.tickets.open), icon: LifeBuoy },
  ];
  return <StatGrid stats={items} />;
}
