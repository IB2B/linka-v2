import type { SupportStatus } from "@/types/admin-support";

const STYLES: Record<SupportStatus, string> = {
  open:     "border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-300",
  pending:  "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  resolved: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  closed:   "border-border bg-muted text-muted-foreground",
};

const LABEL: Record<SupportStatus, string> = {
  open: "Open", pending: "Pending", resolved: "Resolved", closed: "Closed",
};

export function SupportStatusBadge({ status }: { status: SupportStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${STYLES[status]}`}
    >
      {LABEL[status]}
    </span>
  );
}
