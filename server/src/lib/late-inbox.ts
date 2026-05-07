import { lateFetch } from "./late-api";
import { getOrCreateLateProfile } from "./late-profile";

export type RawConversation = {
  _id?: string;
  id?: string;
  platform: string;
  accountId?: string;
  participant?: { name?: string; username?: string; avatar?: string | null };
  lastMessage?: { text?: string; createdAt?: string; direction?: string };
  unreadCount?: number;
  updatedAt?: string;
};

export type RawMessage = {
  _id?: string;
  id?: string;
  text?: string;
  body?: string;
  direction?: "incoming" | "outgoing" | string;
  sender?: { name?: string };
  createdAt?: string;
};

type LatePage<T> = {
  data?: T[];
  conversations?: T[];
  messages?: T[];
  pagination?: { nextCursor?: string | null };
  nextCursor?: string | null;
};

export async function listInboxConversations(userId: string, platform?: string) {
  const profileId = await getOrCreateLateProfile(userId);
  const qs = new URLSearchParams({ profileId, limit: "50" });
  if (platform) qs.set("platform", platform);
  const r = await lateFetch<LatePage<RawConversation>>(
    `/inbox/conversations?${qs.toString()}`,
  );
  return { conversations: r.data ?? r.conversations ?? [] };
}

export async function listInboxMessages(
  conversationId: string, accountId: string, cursor?: string,
) {
  const qs = new URLSearchParams({ accountId, limit: "50" });
  if (cursor) qs.set("cursor", cursor);
  const r = await lateFetch<LatePage<RawMessage>>(
    `/inbox/conversations/${encodeURIComponent(conversationId)}/messages?${qs.toString()}`,
  );
  return {
    messages: r.data ?? r.messages ?? [],
    nextCursor: r.pagination?.nextCursor ?? r.nextCursor ?? null,
  };
}

export async function sendInboxMessage(
  conversationId: string, accountId: string, text: string,
) {
  return lateFetch<{ id?: string }>(
    `/inbox/conversations/${encodeURIComponent(conversationId)}/messages`,
    { method: "POST", body: JSON.stringify({ accountId, text }) },
  );
}
