import { Receipt } from "lucide-react";

import { Card } from "@/components/ui/card";
import { InvoiceRow } from "@/components/admin/subscriptions/invoice-row";
import type { AdminInvoice } from "@/types/admin-payment";

export function InvoicesTable({ invoices }: { invoices: AdminInvoice[] }) {
  if (invoices.length === 0) {
    return (
      <Card size="sm" className="items-center justify-center gap-3 px-6 py-16 text-center">
        <Receipt className="size-5 text-muted-foreground" />
        <p className="text-sm font-medium tracking-tight">No invoices yet</p>
        <p className="max-w-sm text-sm tracking-tight text-muted-foreground">
          Stripe invoices will appear here as subscriptions renew.
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
              <th className="px-4 py-3">Number</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {invoices.map((i) => <InvoiceRow key={i.id} invoice={i} />)}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
