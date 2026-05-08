import { FinancialOverview } from "@/components/admin/subscriptions/financial-overview";
import { SubscriptionsToolbar } from "@/components/admin/subscriptions/subscriptions-toolbar";
import { SubscriptionsTable } from "@/components/admin/subscriptions/subscriptions-table";
import { getAdminSubscriptions } from "@/lib/admin/get-subscriptions";
import { subsFilterFromParams } from "@/lib/admin/subscriptions-filters";

type Props = { sp: { q?: string; tier?: string; status?: string } };

export async function SubscriptionsTab({ sp }: Props) {
  const { rows, total, summary } = await getAdminSubscriptions(sp);
  return (
    <div className="space-y-6">
      <FinancialOverview summary={summary} />
      <div className="space-y-3">
        <div className="flex items-baseline justify-between">
          <h2 className="text-base font-semibold tracking-tight">Subscribers</h2>
        </div>
        <SubscriptionsToolbar
          active={subsFilterFromParams(sp)}
          q={sp.q}
          total={total}
        />
        <SubscriptionsTable rows={rows} />
      </div>
    </div>
  );
}
