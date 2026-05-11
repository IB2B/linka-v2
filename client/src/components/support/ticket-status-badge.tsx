import type { TicketStatus } from "@/lib/support/support.types";

const STYLES: Record<TicketStatus, string> = {
  open:     "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  pending:  "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  resolved: "border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300",
  closed:   "border-border bg-muted text-muted-foreground",
};

const LABEL: Record<TicketStatus, string> = {
  open: "Open", pending: "Pending", resolved: "Resolved", closed: "Closed",
};

export function TicketStatusBadge({ status }: { status: TicketStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${STYLES[status]}`}
    >
      {LABEL[status]}
    </span>
  );
}
