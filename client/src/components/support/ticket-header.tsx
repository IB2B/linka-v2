import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TicketStatusBadge } from "@/components/support/ticket-status-badge";
import { PriorityDot } from "@/components/support/priority-dot";
import { ResolveButton } from "@/components/support/resolve-button";
import type { TicketDetail } from "@/lib/support/support.types";

export function TicketHeader({ detail }: { detail: TicketDetail }) {
  const t = detail.ticket;
  const opened = new Date(t.createdAt).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
  const canResolve = t.status === "open" || t.status === "pending";
  return (
    <div className="space-y-3">
      <Button
        variant="ghost" size="sm" nativeButton={false}
        render={<Link href="/dashboard/support" />}
      >
        <ArrowLeft className="size-3.5" />
        Back to tickets
      </Button>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <h1 className="font-heading text-2xl font-semibold tracking-tight">
            {t.subject}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm tracking-tight text-muted-foreground">
            <TicketStatusBadge status={t.status} />
            <PriorityDot priority={t.priority} />
            {t.category ? (
              <span className="capitalize">{t.category}</span>
            ) : null}
            <span>Opened {opened}</span>
          </div>
        </div>
        {canResolve ? <ResolveButton id={t.id} /> : null}
      </div>
    </div>
  );
}
