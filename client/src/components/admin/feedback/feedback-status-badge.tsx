type Props = { status: "new" | "triaged" | "closed" };

const STYLES: Record<Props["status"], string> = {
  new:     "border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-300",
  triaged: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  closed:  "border-border bg-muted text-muted-foreground",
};

const LABEL: Record<Props["status"], string> = {
  new: "New", triaged: "Read", closed: "Closed",
};

export function FeedbackStatusBadge({ status }: Props) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${STYLES[status]}`}
    >
      {LABEL[status]}
    </span>
  );
}
