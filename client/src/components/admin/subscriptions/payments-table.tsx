import { Receipt, FilterX } from "lucide-react";
import { Card } from "@/components/ui/card";
import { PaymentTableRow } from "@/components/admin/subscriptions/payment-row";
import type { AdminPayment } from "@/types/admin-payment";

type Props = { rows: AdminPayment[]; hasFilter?: boolean };

function EmptyState({ hasFilter }: { hasFilter?: boolean }) {
  return (
    <Card size="sm" className="items-center justify-center gap-3 px-6 py-16 text-center">
      {hasFilter
        ? <FilterX className="size-5 text-muted-foreground" />
        : <Receipt className="size-5 text-muted-foreground" />}
      <p className="text-sm font-medium tracking-tight">
        {hasFilter ? "No results" : "No payments yet"}
      </p>
      <p className="max-w-sm text-sm tracking-tight text-muted-foreground">
        {hasFilter
          ? "No payments match your filters. Try adjusting the date range or search."
          : "Invoices will appear here once customers start paying."}
      </p>
    </Card>
  );
}

export function PaymentsTable({ rows, hasFilter }: Props) {
  if (rows.length === 0) return <EmptyState hasFilter={hasFilter} />;
  return (
    <Card size="sm" className="overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-muted/40">
            <tr className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <th className="px-4 py-3">Invoice</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3 text-right">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => <PaymentTableRow key={r.id} row={r} />)}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
