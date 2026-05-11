"use client";

import { useEffect, useRef } from "react";

import { TicketReplyItem } from "@/components/admin/support/ticket-reply-item";
import type { TicketReply } from "@/types/admin-ticket-detail";

type Props = { replies: TicketReply[] };

export function TicketThreadMessages({ replies }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [replies.length]);

  return (
    <div
      ref={ref}
      className="flex-1 overflow-y-auto bg-muted/30 px-5 py-6"
    >
      <div className="flex flex-col gap-5">
        {replies.map((r) => <TicketReplyItem key={r.id} reply={r} />)}
      </div>
    </div>
  );
}
