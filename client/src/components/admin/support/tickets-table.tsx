import { LifeBuoy } from "lucide-react";

import { Card } from "@/components/ui/card";
import { TicketRow } from "@/components/admin/support/ticket-row";
import type { SupportRow } from "@/types/admin-support";

export function TicketsTable({ rows }: { rows: SupportRow[] }) {
  if (rows.length === 0) {
    return (
      <Card size="sm" className="items-center justify-center gap-3 px-6 py-16 text-center">
        <LifeBuoy className="size-5 text-muted-foreground" />
        <p className="text-sm font-medium tracking-tight">No tickets here</p>
        <p className="max-w-sm text-sm tracking-tight text-muted-foreground">
          Tickets matching this filter will appear here as they come in.
        </p>
      </Card>
    );
  }
  return (
    <Card size="sm" className="overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-muted/40">
            <tr className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <th className="px-4 py-3">Subject</th>
              <th className="px-4 py-3">Requester</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Priority</th>
              <th className="px-4 py-3">Updated</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => <TicketRow key={r.id} row={r} />)}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
