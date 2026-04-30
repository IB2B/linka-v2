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

export async function listInboxConversations(userId: string, platform?: string) {
  const profileId = await getOrCreateLateProfile(userId);
  const qs = new URLSearchParams({ profile: profileId, limit: "50" });
  if (platform) qs.set("platform", platform);
  return lateFetch<{ conversations: RawConversation[] }>(
    `/inbox/conversations?${qs.toString()}`,
  );
}

export async function listInboxMessages(conversationId: string, cursor?: string) {
  const qs = new URLSearchParams({ limit: "50" });
  if (cursor) qs.set("cursor", cursor);
  return lateFetch<{ messages: RawMessage[]; nextCursor?: string }>(
    `/inbox/conversations/${encodeURIComponent(conversationId)}/messages?${qs.toString()}`,
  );
}

export async function sendInboxMessage(conversationId: string, text: string) {
  return lateFetch<{ id?: string }>(
    `/inbox/conversations/${encodeURIComponent(conversationId)}/messages`,
    { method: "POST", body: JSON.stringify({ text }) },
  );
}
