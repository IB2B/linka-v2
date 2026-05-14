import { PageHeader } from "@/components/dashboard/page-header";
import { SubPageNav } from "@/components/admin/sub-page-nav";
import { SubscriptionsTab } from "@/components/admin/subscriptions/subscriptions-tab";
import { PaymentsTab } from "@/components/admin/subscriptions/payments-tab";

export const dynamic = "force-dynamic";

const TABS = [
  { id: "subscriptions", label: "Subscriptions" },
  { id: "payments", label: "Payments" },
];

type Sp = {
  tab?: string; q?: string; tier?: string; status?: string;
  from?: string; to?: string; pq?: string; page?: string;
};

export default async function AdminSubscriptionsPage({
  searchParams,
}: { searchParams: Promise<Sp> }) {
  const sp = await searchParams;
  const active = TABS.find((t) => t.id === sp.tab)?.id ?? "subscriptions";
  return (
    <>
      <PageHeader
        title="Subscriptions"
        description="Stripe subscriptions, charges and invoices across the platform."
      />
      <SubPageNav
        items={TABS}
        active={active}
        basePath="/admin/subscriptions"
        defaultId="subscriptions"
      />
      {active === "subscriptions"
        ? <SubscriptionsTab sp={sp} />
        : <PaymentsTab from={sp.from} to={sp.to} pq={sp.pq} page={sp.page} />}
    </>
  );
}
