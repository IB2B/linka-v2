import { MessageCircle } from "lucide-react";

import { Card } from "@/components/ui/card";
import { TicketThreadMessages } from "@/components/admin/support/ticket-thread-messages";
import { TicketReplyComposer } from "@/components/admin/support/ticket-reply-composer";
import type { TicketReply } from "@/types/admin-ticket-detail";

type Props = { ticketId: string; replies: TicketReply[] };

export function TicketThread({ ticketId, replies }: Props) {
  return (
    <Card size="sm" className="min-h-0 flex-1 gap-0 overflow-hidden p-0">
      {replies.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 bg-muted/30 px-5 py-12 text-center">
          <div className="grid size-9 place-items-center rounded-full border bg-background">
            <MessageCircle className="size-4 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium tracking-tight">No replies yet</p>
          <p className="max-w-xs text-xs tracking-tight text-muted-foreground">
            Write the first response — it will be delivered to the user.
          </p>
        </div>
      ) : (
        <TicketThreadMessages replies={replies} />
      )}
      <TicketReplyComposer id={ticketId} />
    </Card>
  );
}
