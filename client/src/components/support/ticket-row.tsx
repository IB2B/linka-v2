import { TicketStatusBadge } from "./ticket-status-badge";
import type { SupportTicket } from "@/lib/support/support.types";

export function TicketRow({ ticket }: { ticket: SupportTicket }) {
  const date = new Date(ticket.createdAt).toLocaleDateString(undefined, {
    month: "short", day: "numeric", year: "numeric",
  });
  return (
    <li className="flex items-center justify-between gap-4 rounded-lg border bg-card px-4 py-3">
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{ticket.subject}</p>
        <p className="text-xs text-muted-foreground capitalize">
          {ticket.category ?? "general"} · {date}
        </p>
      </div>
      <TicketStatusBadge status={ticket.status} />
    </li>
  );
}
