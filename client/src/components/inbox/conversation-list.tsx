"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ConversationRow } from "./conversation-row";
import { PlatformFilter } from "./platform-filter";
import { ConnectedAccountsStack } from "./connected-accounts-stack";
import { useInboxUnread } from "@/components/dashboard/inbox-unread-badge";
import type { Conversation } from "@/lib/inbox/inbox.types";
import type { ZernioAccount } from "@/lib/zernio/zernio-account.types";

type Props = {
  conversations: Conversation[];
  activeId: string | null;
  platform: string;
  accounts: ZernioAccount[];
};

export function ConversationList({ conversations, activeId, platform, accounts }: Props) {
  const [query, setQuery] = useState("");
  const { ids: unreadIds } = useInboxUnread();
  const hrefSuffix = platform ? `?platform=${platform}` : "";
  const connected = accounts.filter((a) => a.connected).map((a) => a.platform);

  const filtered = query.trim()
    ? conversations.filter((c) =>
        c.participantName.toLowerCase().includes(query.toLowerCase()) ||
        c.participantUsername?.toLowerCase().includes(query.toLowerCase()) ||
        c.lastMessage?.toLowerCase().includes(query.toLowerCase()),
      )
    : conversations;

  return (
    <div className="flex h-full flex-col">
      <div className="border-b">
        <div className="flex items-center justify-between gap-2 px-4 py-3">
          <h2 className="text-sm font-semibold">Conversations</h2>

          <ConnectedAccountsStack accounts={accounts} />
        </div>
        <div className="px-3 pb-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search conversations…"
              className="h-8 pl-8 text-sm"
            />
          </div>
        </div>
        <PlatformFilter active={platform} connected={connected} />
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {filtered.length === 0 ? (
          <p className="px-3 py-8 text-center text-sm text-muted-foreground">
            {query ? "No conversations match your search." : "No conversations yet."}
          </p>
        ) : (
          <ul className="space-y-0.5">
            {filtered.map((c) => (
              <li key={c.id}>
                <ConversationRow
                conversation={{ ...c, unread: unreadIds.size > 0 ? unreadIds.has(c.id!) : c.unread }}
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
