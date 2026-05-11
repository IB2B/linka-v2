"use client";

import { useMemo, useState } from "react";

import { TicketsTable } from "./tickets-table";
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

  return (
    <div className="space-y-3">
      {tickets.length > 0 ? (
        <TicketFilter value={filter} onChange={setFilter} counts={counts} />
      ) : null}
      <TicketsTable tickets={visible} />
    </div>
  );
}
