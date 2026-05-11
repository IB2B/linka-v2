import { notFound } from "next/navigation";

import { TicketHeader } from "@/components/admin/support/ticket-header";
import { TicketMeta } from "@/components/admin/support/ticket-meta";
import { TicketThread } from "@/components/admin/support/ticket-thread";
import { getAdminTicket } from "@/lib/admin/get-ticket";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function AdminTicketDetailPage({ params }: Props) {
  const { id } = await params;
  const detail = await getAdminTicket(id);
  if (!detail) notFound();

  return (
    <div className="space-y-6">
      <TicketHeader detail={detail} />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="space-y-3">
          <h2 className="text-base font-semibold tracking-tight">Conversation</h2>
          <TicketThread ticketId={detail.ticket.id} replies={detail.replies} />
        </div>
        <TicketMeta detail={detail} />
      </div>
    </div>
  );
}
