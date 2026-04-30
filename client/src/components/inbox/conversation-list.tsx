import { ConversationRow } from "./conversation-row";
import { PlatformFilter } from "./platform-filter";
import type { Conversation } from "@/lib/inbox/inbox.types";

type Props = {
  conversations: Conversation[];
  activeId: string | null;
  platform: string;
};

export function ConversationList({ conversations, activeId, platform }: Props) {
  const hrefSuffix = platform ? `?platform=${platform}` : "";
  return (
    <div className="flex h-full flex-col">
      <div className="border-b">
        <div className="flex items-center justify-between px-4 py-3">
          <h2 className="text-sm font-semibold">Conversations</h2>
          <span className="text-xs text-muted-foreground">{conversations.length}</span>
        </div>
        <PlatformFilter active={platform} />
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {conversations.length === 0 ? (
          <p className="px-3 py-8 text-center text-sm text-muted-foreground">
            No conversations yet.
          </p>
        ) : (
          <ul className="space-y-0.5">
            {conversations.map((c) => (
              <li key={c.id}>
                <ConversationRow
                  conversation={c}
                  active={c.id === activeId}
                  hrefSuffix={hrefSuffix}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
