import { ConversationRow } from "./conversation-row";
import { PlatformFilter } from "./platform-filter";
import { ConnectedAccountsStack } from "./connected-accounts-stack";
import type { Conversation } from "@/lib/inbox/inbox.types";
import type { ZernioAccount } from "@/lib/zernio/zernio-account.types";

type Props = {
  conversations: Conversation[];
  activeId: string | null;
  platform: string;
  accounts: ZernioAccount[];
};

export function ConversationList({ conversations, activeId, platform, accounts }: Props) {
  const hrefSuffix = platform ? `?platform=${platform}` : "";
  const connected = accounts.filter((a) => a.connected).map((a) => a.platform);
  return (
    <div className="flex h-full flex-col">
      <div className="border-b">
        <div className="flex items-center justify-between gap-2 px-4 py-3">
          <h2 className="text-sm font-semibold">Conversations</h2>
          <ConnectedAccountsStack accounts={accounts} />
        </div>
        <PlatformFilter active={platform} connected={connected} />
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
