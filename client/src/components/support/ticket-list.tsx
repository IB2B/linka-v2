"use client";

import { useMemo, useState } from "react";

import { TicketRow } from "./ticket-row";
import { TicketFilter, type FilterValue } from "./ticket-filter";
import type { SupportTicket, TicketStatus } from "@/lib/support/support.types";

const STATUSES: TicketStatus[] = ["open", "pending", "resolved", "closed"];

export function TicketList({ tickets }: { tickets: SupportTicket[] }) {
  const [filter, setFilter] = useState<FilterValue>("all");

  const counts = useMemo(() => {
    const c = { all: tickets.length } as Record<FilterValue, number>;
    for (const s of STATUSES) c[s] = tickets.filter((t) => t.status === s).length;
    return c;
  }, [tickets]);

  const visible = filter === "all" ? tickets : tickets.filter((t) => t.status === filter);

  if (tickets.length === 0) {
    return (
      <div className="rounded-lg border border-dashed bg-card/50 p-8 text-center">
        <p className="text-sm text-muted-foreground">
          No tickets yet. Submit one above and our team will reach out.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <TicketFilter value={filter} onChange={setFilter} counts={counts} />
      {visible.length === 0 ? (
        <p className="rounded-lg border border-dashed p-4 text-center text-sm text-muted-foreground">
          No {filter} tickets.
        </p>
      ) : (
        <ul className="space-y-2">
          {visible.map((t) => <TicketRow key={t.id} ticket={t} />)}
        </ul>
      )}
    </div>
  );
}
