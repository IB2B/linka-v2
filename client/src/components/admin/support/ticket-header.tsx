import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { TicketDetail } from "@/types/admin-ticket-detail";

export function TicketHeader({ detail }: { detail: TicketDetail }) {
  const t = detail.ticket;
  return (
    <div className="space-y-4">
      <Button
        variant="ghost" size="sm" nativeButton={false}
        render={<Link href="/admin/support" />}
      >
        <ArrowLeft className="size-3.5" />
        Back to tickets
      </Button>
      <div className="space-y-1">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          {t.subject}
        </h1>
        <p className="text-sm tracking-tight text-muted-foreground">
          Ticket <span className="font-mono">{t.id.slice(0, 8)}</span>
        </p>
      </div>
      <Card size="sm" className="gap-2 px-5 py-4">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Original request
        </span>
        <p className="whitespace-pre-wrap text-sm tracking-tight text-foreground/90">
          {t.body}
        </p>
        {t.attachmentUrl ? (
          <a
            href={t.attachmentUrl} target="_blank" rel="noreferrer"
            className="mt-2 block overflow-hidden rounded-lg border bg-background"
          >
            <img src={t.attachmentUrl} alt="Attachment" className="max-h-72 w-auto" />
          </a>
        ) : null}
      </Card>
    </div>
  );
}
