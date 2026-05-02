import { InboxAvatar } from "./inbox-avatar";
import { PlatformBadge } from "./platform-badge";
import { platformColor } from "./platform-color";
import type { Conversation } from "@/lib/inbox/inbox.types";

export function ThreadHeader({ conversation }: { conversation: Conversation }) {
  const color = platformColor(conversation.platform);
  const pillStyle = color
    ? {
        color,
        backgroundColor: `${color}1a`,
        borderColor: `${color}33`,
      }
    : undefined;
  return (
    <div className="flex items-center gap-3 border-b px-4 py-3">
      <InboxAvatar name={conversation.participantName} src={conversation.participantAvatar} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{conversation.participantName}</p>
        <div
          style={pillStyle}
          className="mt-0.5 inline-flex items-center gap-1.5 rounded-full border bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
        >
          <PlatformBadge platform={conversation.platform} className="size-3" />
          <span className="capitalize">{conversation.platform}</span>
        </div>
      </div>
    </div>
  );
}
