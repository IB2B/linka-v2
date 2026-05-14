import { Suspense } from "react";
import { PaymentsTable } from "@/components/admin/subscriptions/payments-table";
import { PaymentsSkeleton } from "@/components/admin/subscriptions/payments-skeleton";
import { PaymentsSearch } from "@/components/admin/subscriptions/payments-search";
import { PaymentsPagination } from "@/components/admin/subscriptions/payments-pagination";
import { SubscriptionsDateRange } from "@/components/admin/subscriptions/subscriptions-date-range";
import { getAdminPayments } from "@/lib/admin/get-payments";

type Props = { from?: string; to?: string; pq?: string; page?: string };

const PAGE_SIZE = 20;

async function PaymentsContent({ from, to, pq, page }: Props) {
  const rows = await getAdminPayments({ from, to });
  const filtered = pq
    ? rows.filter((r) => r.customerEmail?.toLowerCase().includes(pq.toLowerCase()))
    : rows;
  const pageNum = Math.max(1, parseInt(page ?? "1", 10));
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageRows = filtered.slice((pageNum - 1) * PAGE_SIZE, pageNum * PAGE_SIZE);
  const hasFilter = !!(from || to || pq);
  return (
    <>
      <PaymentsTable rows={pageRows} hasFilter={hasFilter} />
      {totalPages > 1 && (
        <PaymentsPagination page={pageNum} totalPages={totalPages} total={filtered.length} />
      )}
    </>
  );
}

export function PaymentsTab({ from, to, pq, page }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <h2 className="text-base font-semibold tracking-tight">Payments History</h2>
          <p className="text-sm tracking-tight text-muted-foreground">
            All invoices across all customers, including card details.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <PaymentsSearch />
          <SubscriptionsDateRange from={from} to={to} />
        </div>
      </div>
      <Suspense fallback={<PaymentsSkeleton />}>
        <PaymentsContent from={from} to={to} pq={pq} page={page} />
      </Suspense>
    </div>
  );
}
