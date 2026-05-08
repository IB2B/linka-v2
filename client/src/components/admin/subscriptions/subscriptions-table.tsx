import { CreditCard } from "lucide-react";

import { Card } from "@/components/ui/card";
import { SubscriptionRow } from "@/components/admin/subscriptions/subscription-row";
import type { AdminSubscriptionRow } from "@/types/admin-subscription";

export function SubscriptionsTable({ rows }: { rows: AdminSubscriptionRow[] }) {
  if (rows.length === 0) {
    return (
      <Card size="sm" className="items-center justify-center gap-3 px-6 py-16 text-center">
        <CreditCard className="size-5 text-muted-foreground" />
        <p className="text-sm font-medium tracking-tight">No subscriptions match this filter</p>
        <p className="max-w-sm text-sm tracking-tight text-muted-foreground">
          Clear the filter or try a different search term.
        </p>
      </Card>
    );
  }
  return (
    <Card size="sm" className="overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-muted/40">
            <tr className="text-xs font-medium tracking-tight text-muted-foreground">
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Plan</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">MRR</th>
              <th className="px-4 py-3">Period</th>
              <th className="px-4 py-3">Started</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <SubscriptionRow key={r.id} row={r} />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
