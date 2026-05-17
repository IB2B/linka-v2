import { InboxAvatar } from "@/components/inbox/inbox-avatar";
import { cn } from "@/lib/utils";
import { formatRelative } from "@/lib/admin/format-relative";
import { TicketMessageBody } from "./ticket-message-body";
import type { TicketAuthor } from "@/lib/support/support.types";

type Props = {
  author: TicketAuthor;
  body: string;
  attachmentUrl: string | null;
  createdAt: string;
  mine: boolean;
  badge?: string;
};

export function TicketMessage({
  author, body, attachmentUrl, createdAt, mine, badge,
}: Props) {
  const name = `${author.firstName ?? ""} ${author.lastName ?? ""}`.trim() || author.email;
  return (
    <div className={cn("flex w-full gap-2.5", mine && "flex-row-reverse")}>
      <div className="shrink-0 self-end">
        <InboxAvatar name={name} src={author.avatarUrl} />
      </div>
      <div className={cn("flex max-w-[78%] min-w-0 flex-col gap-1", mine && "items-end")}>
        <div className={cn(
          "flex items-baseline gap-2 text-xs tracking-tight",
          mine && "flex-row-reverse",
        )}>
          <span className="font-medium text-foreground">{name}</span>
          {badge ? (
            <span className="rounded-full bg-primary/10 px-1.5 py-px text-[10px] font-medium uppercase tracking-wider text-primary">
              {badge}
            </span>
          ) : null}
          <span
            className="text-muted-foreground tabular-nums"
            title={new Date(createdAt).toLocaleString()}
          >
            {formatRelative(createdAt)}
          </span>
        </div>
        <TicketMessageBody body={body} mine={mine} />
        {attachmentUrl ? (
          <a
            href={attachmentUrl} target="_blank" rel="noreferrer"
            className="block overflow-hidden rounded-lg border bg-background"
          >
            <img src={attachmentUrl} alt="Attachment" className="max-h-64 w-auto" />
          </a>
        ) : null}
      </div>
    </div>
  );
}
