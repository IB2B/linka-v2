import { InboxAvatar } from "@/components/inbox/inbox-avatar";
import { TicketMessageBody } from "@/components/support/ticket-message-body";
import { cn } from "@/lib/utils";
import { formatRelative } from "@/lib/admin/format-relative";
import type { TicketReply } from "@/types/admin-ticket-detail";

export function TicketReplyItem({ reply }: { reply: TicketReply }) {
  const a = reply.author;
  const name = `${a.firstName ?? ""} ${a.lastName ?? ""}`.trim() || a.email;
  const mine = reply.isAdmin;
  return (
    <div className={cn("flex w-full gap-2.5", mine && "flex-row-reverse")}>
      <div className="shrink-0 self-end">
        <InboxAvatar name={name} src={a.avatarUrl} />
      </div>
      <div className={cn("flex max-w-[78%] min-w-0 flex-col gap-1", mine && "items-end")}>
        <div className={cn(
          "flex items-baseline gap-2 text-xs tracking-tight",
          mine && "flex-row-reverse",
        )}>
          <span className="font-medium text-foreground">{name}</span>
          {mine ? (
            <span className="rounded-full bg-primary/10 px-1.5 py-px text-[10px] font-medium uppercase tracking-wider text-primary">
              Staff
            </span>
          ) : null}
          <span
            className="text-muted-foreground tabular-nums"
            title={new Date(reply.createdAt).toLocaleString()}
          >
            {formatRelative(reply.createdAt)}
          </span>
        </div>
        <TicketMessageBody body={reply.body} mine={mine} />
        {reply.attachmentUrl ? (
          <a
            href={reply.attachmentUrl} target="_blank" rel="noreferrer"
            className="block max-w-xs overflow-hidden rounded-lg border bg-background"
          >
            <img
              src={reply.attachmentUrl}
              alt="Attachment"
              className="h-auto max-h-56 w-full object-cover"
            />
          </a>
        ) : null}
      </div>
    </div>
  );
}
