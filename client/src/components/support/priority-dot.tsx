import type { TicketPriority } from "@/lib/support/support.types";

const COLORS: Record<TicketPriority, string> = {
  urgent: "bg-red-500",
  high:   "bg-orange-500",
  normal: "bg-muted-foreground/50",
  low:    "bg-muted-foreground/30",
};

const LABEL: Record<TicketPriority, string> = {
  urgent: "Urgent", high: "High", normal: "Normal", low: "Low",
};

const SIGNAL = new Set<TicketPriority>(["urgent", "high"]);

export function PriorityDot({ priority }: { priority: TicketPriority }) {
  const active = SIGNAL.has(priority);
  return (
    <span
      className="inline-flex items-center gap-1.5 text-[11px] tracking-tight text-muted-foreground"
      title={`Priority: ${LABEL[priority]}`}
    >
      <span className="relative inline-flex size-2 items-center justify-center">
        {active ? (
          <span
            className={`absolute inline-flex size-full animate-ping rounded-full opacity-75 ${COLORS[priority]}`}
            aria-hidden
          />
        ) : null}
        <span
          className={`relative inline-flex size-1.5 rounded-full ${COLORS[priority]}`}
          aria-hidden
        />
      </span>
      {LABEL[priority]}
    </span>
  );
}
