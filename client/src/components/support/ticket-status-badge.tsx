import type { TicketStatus } from "@/lib/support/support.types";

export function TicketStatusBadge({ status }: { status: TicketStatus }) {
  return (
    <span className="inline-flex items-center rounded-full border bg-background px-2 py-0.5 text-xs font-medium capitalize text-muted-foreground">
      {status}
    </span>
  );
}
