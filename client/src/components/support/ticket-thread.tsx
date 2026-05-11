import { Card } from "@/components/ui/card";
import { TicketMessage } from "@/components/support/ticket-message";
import { TicketReplyComposer } from "@/components/support/ticket-reply-composer";
import type { TicketDetail } from "@/lib/support/support.types";

type Props = { detail: TicketDetail; userEmail: string | null };

export function TicketThread({ detail, userEmail }: Props) {
  const t = detail.ticket;
  return (
    <Card size="sm" className="gap-0 overflow-hidden p-0">
      <div className="flex flex-col gap-5 bg-muted/30 px-5 py-6">
        <TicketMessage
          author={{ firstName: "You", lastName: "", email: userEmail ?? "", avatarUrl: null }}
          body={t.body}
          attachmentUrl={t.attachmentUrl}
          createdAt={t.createdAt}
          mine={true}
          badge="Original"
        />
        {detail.replies.map((r) => (
          <TicketMessage
            key={r.id}
            author={r.author}
            body={r.body}
            attachmentUrl={r.attachmentUrl}
            createdAt={r.createdAt}
            mine={!r.isAdmin}
            badge={r.isAdmin ? "Support" : undefined}
          />
        ))}
      </div>
      {t.status === "closed" ? (
        <div className="border-t bg-muted/30 px-4 py-3 text-center text-xs tracking-tight text-muted-foreground">
          This ticket is closed. Replying will reopen it.
        </div>
      ) : null}
      <TicketReplyComposer id={t.id} />
    </Card>
  );
}
