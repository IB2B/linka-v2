import { PageHeader } from "@/components/dashboard/page-header";
import { SupportOverview } from "@/components/admin/support/support-overview";
import { SupportToolbar } from "@/components/admin/support/support-toolbar";
import { TicketsTable } from "@/components/admin/support/tickets-table";
import { getAdminSupport } from "@/lib/admin/get-support";
import { supportFilterFromParams } from "@/lib/admin/support-filters";

export const dynamic = "force-dynamic";

type Sp = { q?: string; status?: string; priority?: string; category?: string };

export default async function AdminSupportPage({
  searchParams,
}: { searchParams: Promise<Sp> }) {
  const sp = await searchParams;
  const { rows, total, summary } = await getAdminSupport(sp);
  return (
    <>
      <PageHeader
        title="Support"
        description="Inbound tickets from users — triage, prioritise and resolve."
      />
      <div className="space-y-6">
        <SupportOverview summary={summary} />
        <div className="space-y-3">
          <h2 className="text-base font-semibold tracking-tight">All tickets</h2>
          <SupportToolbar
            active={supportFilterFromParams(sp)}
            q={sp.q}
            total={total}
          />
          <TicketsTable rows={rows} />
        </div>
      </div>
    </>
  );
}
