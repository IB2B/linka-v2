import { InboxAvatar } from "@/components/inbox/inbox-avatar";
import { PlanBadge } from "@/components/admin/subscriptions/plan-badge";
import { SubStatusBadge } from "@/components/admin/subscriptions/sub-status-badge";
import { formatMoney } from "@/lib/admin/format-money";
import { formatRelative } from "@/lib/admin/format-relative";
import type { AdminSubscriptionRow } from "@/types/admin-subscription";

function fmtDate(s: string | null): string {
  if (!s) return "—";
  return new Date(s).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function SubscriptionRow({ row }: { row: AdminSubscriptionRow }) {
  const fullName = `${row.firstName} ${row.lastName}`.trim() || row.email;
  const renews = row.cancelAtPeriodEnd ? "Cancels" : "Renews";
  return (
    <tr className="border-t transition hover:bg-muted/40">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <InboxAvatar name={fullName} src={row.avatarUrl} />
          <div className="min-w-0">
            <div className="truncate text-sm font-medium tracking-tight">{fullName}</div>
            <div className="truncate text-xs tracking-tight text-muted-foreground">{row.email}</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-3"><PlanBadge tier={row.planTier} /></td>
      <td className="px-4 py-3"><SubStatusBadge status={row.status} /></td>
      <td className="px-4 py-3 text-sm tabular-nums tracking-tight">
        {row.mrr > 0 ? formatMoney(row.mrr) : "—"}
      </td>
      <td className="px-4 py-3 text-sm tabular-nums tracking-tight text-muted-foreground">
        {row.currentPeriodEnd ? `${renews} ${fmtDate(row.currentPeriodEnd)}` : "—"}
      </td>
      <td
        className="px-4 py-3 text-sm tabular-nums tracking-tight text-muted-foreground"
        title={row.createdAt ? new Date(row.createdAt).toLocaleString() : undefined}
      >
        {row.createdAt ? formatRelative(row.createdAt) : "—"}
      </td>
    </tr>
  );
}
