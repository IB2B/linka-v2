import { ChargesTable } from "@/components/admin/subscriptions/charges-table";
import { InvoicesTable } from "@/components/admin/subscriptions/invoices-table";
import { PaymentsToggle } from "@/components/admin/subscriptions/payments-toggle";
import { SubscriptionsDateRange } from "@/components/admin/subscriptions/subscriptions-date-range";
import { getAdminCharges, getAdminInvoices } from "@/lib/admin/get-payments";

const ITEMS = [
  { id: "charges", label: "Charges" },
  { id: "invoices", label: "Invoices" },
];

const BASE = "/admin/subscriptions?tab=payments";

type Props = { view: string; from?: string; to?: string };

export async function PaymentsTab({ view, from, to }: Props) {
  const active = view === "invoices" ? "invoices" : "charges";
  const range = { from, to };
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <h2 className="text-base font-semibold tracking-tight">Payments History</h2>
          <p className="text-sm tracking-tight text-muted-foreground">
            Keep track of charges and invoices across all customers.
          </p>
        </div>
        <SubscriptionsDateRange from={from} to={to} />
      </div>
      <PaymentsToggle items={ITEMS} active={active} basePath={BASE} />
      {active === "charges" ? (
        <ChargesTable charges={await getAdminCharges(range)} />
      ) : (
        <InvoicesTable invoices={await getAdminInvoices(range)} />
      )}
    </div>
  );
}
