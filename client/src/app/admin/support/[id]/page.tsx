import { notFound } from "next/navigation";

import { TicketHeader } from "@/components/admin/support/ticket-header";
import { TicketMeta } from "@/components/admin/support/ticket-meta";
import { TicketThread } from "@/components/admin/support/ticket-thread";
import { getAdminTicket } from "@/lib/admin/get-ticket";
import type { TicketReply } from "@/types/admin-ticket-detail";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function AdminTicketDetailPage({ params }: Props) {
  const { id } = await params;
  const detail = await getAdminTicket(id);
  if (!detail) notFound();

  const t = detail.ticket;
  const original: TicketReply = {
    id: `ticket-${t.id}`,
    body: t.body,
    attachmentUrl: t.attachmentUrl,
    isAdmin: false,
    createdAt: t.createdAt,
    author: t.user,
  };
  const replies = [original, ...detail.replies];

  return (
    <div className="flex min-h-0 flex-col gap-4 lg:h-[calc(100svh-6.5rem)]">
      <TicketHeader detail={detail} />
      <div className="grid min-h-0 flex-1 gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="flex min-h-0 flex-col gap-3">
          <h2 className="text-sm font-semibold tracking-tight text-muted-foreground">
            Conversation
          </h2>
          <TicketThread ticketId={t.id} replies={replies} />
        </div>
        <div className="min-h-0 overflow-y-auto">
          <TicketMeta detail={detail} />
        </div>
      </div>
    </div>
  );
}
