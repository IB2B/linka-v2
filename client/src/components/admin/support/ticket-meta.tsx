import { Card } from "@/components/ui/card";
import { SupportStatusBadge } from "@/components/admin/support/support-status-badge";
import { SupportCategoryPill } from "@/components/admin/support/support-category-pill";
import { SupportPriorityMenu } from "@/components/admin/support/support-priority-menu";
import { SupportRequester } from "@/components/admin/support/support-requester";
import { SupportActions } from "@/components/admin/support/support-actions";
import type { TicketDetail } from "@/types/admin-ticket-detail";

function fmt(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-US", {
    month: "short", day: "numeric", year: "numeric",
    hour: "numeric", minute: "2-digit",
  });
}

type Row = { label: string; value: React.ReactNode };

export function TicketMeta({ detail }: { detail: TicketDetail }) {
  const t = detail.ticket;
  const rows: Row[] = [
    { label: "Status",   value: <SupportStatusBadge status={t.status} /> },
    { label: "Priority", value: <SupportPriorityMenu id={t.id} priority={t.priority} /> },
    { label: "Category", value: <SupportCategoryPill category={t.category} /> },
    { label: "Requester", value: <SupportRequester user={t.user} /> },
    { label: "Opened",   value: <span className="text-sm tracking-tight">{fmt(t.createdAt)}</span> },
    { label: "Updated",  value: <span className="text-sm tracking-tight">{fmt(t.updatedAt)}</span> },
    { label: "Closed",   value: <span className="text-sm tracking-tight">{fmt(t.closedAt)}</span> },
  ];
  return (
    <Card size="sm" className="gap-0 p-0">
      <div className="flex items-center justify-between border-b px-5 py-3">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Details
        </span>
        <SupportActions id={t.id} status={t.status} />
      </div>
      <dl className="divide-y">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between gap-4 px-5 py-3">
            <dt className="text-xs font-medium tracking-tight text-muted-foreground">{r.label}</dt>
            <dd className="min-w-0 text-right">{r.value}</dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}
