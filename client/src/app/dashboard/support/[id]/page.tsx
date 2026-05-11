import { notFound } from "next/navigation";

import { TicketHeader } from "@/components/support/ticket-header";
import { TicketThread } from "@/components/support/ticket-thread";
import { MarkViewed } from "@/components/support/mark-viewed";
import { RatingPrompt } from "@/components/support/rating-prompt";
import { getTicket } from "@/lib/support/get-ticket";
import { fetchMe } from "@/lib/auth/me";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function MyTicketDetailPage({ params }: Props) {
  const { id } = await params;
  const [detail, me] = await Promise.all([getTicket(id), fetchMe()]);
  if (!detail) notFound();

  const t = detail.ticket;
  const showRating = t.status === "resolved" || t.status === "closed";

  return (
    <div className="space-y-6">
      <MarkViewed id={id} />
      <TicketHeader detail={detail} />
      <TicketThread detail={detail} userEmail={me?.email ?? null} />
      {showRating ? <RatingPrompt id={t.id} current={t.rating} /> : null}
    </div>
  );
}
