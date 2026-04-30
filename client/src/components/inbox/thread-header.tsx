import { InboxAvatar } from "./inbox-avatar";
import { PlatformBadge } from "./platform-badge";
import type { Conversation } from "@/lib/inbox/inbox.types";

export function ThreadHeader({ conversation }: { conversation: Conversation }) {
  return (
    <div className="flex items-center gap-3 border-b px-4 py-3">
      <InboxAvatar name={conversation.participantName} src={conversation.participantAvatar} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{conversation.participantName}</p>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <PlatformBadge platform={conversation.platform} className="size-3" />
          <span className="capitalize">{conversation.platform}</span>
        </div>
      </div>
    </div>
  );
}
