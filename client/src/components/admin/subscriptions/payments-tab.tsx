import { ChargesTable } from "@/components/admin/subscriptions/charges-table";
import { InvoicesTable } from "@/components/admin/subscriptions/invoices-table";
import { PaymentsToggle } from "@/components/admin/subscriptions/payments-toggle";
import { getAdminCharges, getAdminInvoices } from "@/lib/admin/get-payments";

const ITEMS = [
  { id: "charges", label: "Charges" },
  { id: "invoices", label: "Invoices" },
];

const BASE = "/admin/subscriptions?tab=payments";

export async function PaymentsTab({ view }: { view: string }) {
  const active = view === "invoices" ? "invoices" : "charges";
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-base font-semibold tracking-tight">Payments History</h2>
        <p className="text-sm tracking-tight text-muted-foreground">
          Keep track of charges and invoices across all customers.
        </p>
      </div>
      <PaymentsToggle items={ITEMS} active={active} basePath={BASE} />
      {active === "charges" ? (
        <ChargesTable charges={await getAdminCharges()} />
      ) : (
        <InvoicesTable invoices={await getAdminInvoices()} />
      )}
    </div>
  );
}
