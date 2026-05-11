import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { TicketDetail } from "@/types/admin-ticket-detail";

export function TicketHeader({ detail }: { detail: TicketDetail }) {
  const t = detail.ticket;
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="space-y-1">
        <Button
          variant="ghost" size="sm" nativeButton={false}
          render={<Link href="/admin/support" />}
          className="-ml-2 h-7 px-2 text-muted-foreground"
        >
          <ArrowLeft className="size-3.5" />
          Back to tickets
        </Button>
        <h1 className="font-heading text-xl font-semibold tracking-tight">
          {t.subject}
        </h1>
        <p className="text-xs tracking-tight text-muted-foreground">
          Ticket <span className="font-mono">{t.id.slice(0, 8)}</span>
        </p>
      </div>
    </div>
  );
}
