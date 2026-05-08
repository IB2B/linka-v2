import { Wallet } from "lucide-react";

import { Card } from "@/components/ui/card";
import { ChargeRow } from "@/components/admin/subscriptions/charge-row";
import type { AdminCharge } from "@/types/admin-payment";

export function ChargesTable({ charges }: { charges: AdminCharge[] }) {
  if (charges.length === 0) {
    return (
      <Card size="sm" className="items-center justify-center gap-3 px-6 py-16 text-center">
        <Wallet className="size-5 text-muted-foreground" />
        <p className="text-sm font-medium tracking-tight">No charges yet</p>
        <p className="max-w-sm text-sm tracking-tight text-muted-foreground">
          Stripe charges will appear here once customers start paying.
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
              <th className="px-4 py-3">Id</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Card details</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {charges.map((c) => <ChargeRow key={c.id} charge={c} />)}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
