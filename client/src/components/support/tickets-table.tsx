import { Inbox } from "lucide-react";

import { Card } from "@/components/ui/card";
import { TicketRow } from "@/components/support/ticket-row";
import type { SupportTicket } from "@/lib/support/support.types";

export function TicketsTable({ tickets }: { tickets: SupportTicket[] }) {
  if (tickets.length === 0) {
    return (
      <Card size="sm" className="items-center justify-center gap-3 px-6 py-14 text-center">
        <div className="grid size-9 place-items-center rounded-full border bg-background">
          <Inbox className="size-4 text-muted-foreground" />
        </div>
        <p className="text-sm font-medium tracking-tight">No tickets yet</p>
        <p className="max-w-sm text-sm tracking-tight text-muted-foreground">
          Click "New ticket" to open one — our team will get back to you by email.
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
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Priority</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Updated</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => <TicketRow key={t.id} ticket={t} />)}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
