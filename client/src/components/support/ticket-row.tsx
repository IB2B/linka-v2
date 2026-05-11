import Link from "next/link";

import { TicketStatusBadge } from "./ticket-status-badge";
import { PriorityDot } from "./priority-dot";
import { UnreadDot } from "./unread-dot";
import { formatRelative } from "@/lib/admin/format-relative";
import type { SupportTicket } from "@/lib/support/support.types";

export function TicketRow({ ticket }: { ticket: SupportTicket }) {
  return (
    <tr className="border-t align-middle transition hover:bg-muted/40">
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          {ticket.hasUnread ? <UnreadDot /> : null}
          <Link
            href={`/dashboard/support/${ticket.id}`}
            className="truncate text-sm font-medium tracking-tight transition-colors hover:text-blue-600 hover:underline dark:hover:text-blue-400"
          >
            {ticket.subject}
          </Link>
        </div>
      </td>
      <td className="px-4 py-3">
        {ticket.category ? (
          <span className="inline-flex items-center rounded-md border px-1.5 py-0.5 text-[11px] capitalize tracking-tight text-muted-foreground">
            {ticket.category}
          </span>
        ) : <span className="text-xs text-muted-foreground">—</span>}
      </td>
      <td className="px-4 py-3"><PriorityDot priority={ticket.priority} /></td>
      <td className="px-4 py-3"><TicketStatusBadge status={ticket.status} /></td>
      <td className="px-4 py-3 text-sm tabular-nums tracking-tight text-muted-foreground">
        <span title={new Date(ticket.updatedAt).toLocaleString()}>
          {formatRelative(ticket.updatedAt)}
        </span>
      </td>
    </tr>
  );
}
