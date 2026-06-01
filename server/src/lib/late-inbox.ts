import { lateFetch } from "./late-api";
import { getOrCreateLateProfile } from "./late-profile";

export type RawConversation = {
  _id?: string;
  id?: string;
  platform: string;
  accountId?: string;
  // flat shape (current API)
  participantName?: string;
  participantUsername?: string;
  participantPicture?: string | null;
  lastMessage?: string | { text?: string; createdAt?: string; direction?: string };
  updatedTime?: string;
  unreadCount?: number;
  updatedAt?: string;
  // nested shape (legacy / fallback)
  participant?: { name?: string; username?: string; avatar?: string | null };
};

export type RawMessage = {
  _id?: string;
  id?: string;
  message?: string;  // current API
  text?: string;
  body?: string;
  direction?: "incoming" | "outgoing" | string;
  senderName?: string;  // current API (flat)
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

function toLatePlatform(p: string): string {
  return p === "x" ? "twitter" : p;
}

export async function listInboxConversations(userId: string, platform?: string) {
  const profileId = await getOrCreateLateProfile(userId);
  const qs = new URLSearchParams({ profileId, limit: "10" });
  if (platform) qs.set("platform", toLatePlatform(platform));
  const url = `/inbox/conversations?${qs.toString()}`;
  const r = await lateFetch<LatePage<RawConversation>>(url);
  const list = r.data ?? r.conversations ?? [];
  return { conversations: list };
}

export async function listInboxMessages(
  conversationId: string, accountId: string, cursor?: string,
) {
  const qs = new URLSearchParams({ accountId, limit: "50" });
  if (cursor) qs.set("cursor", cursor);
  const r = await lateFetch<LatePage<RawMessage>>(
    `/inbox/conversations/${encodeURIComponent(conversationId)}/messages?${qs.toString()}`,
  );
  const msgs = r.data ?? r.messages ?? [];
  return {
    messages: msgs,
    nextCursor: r.pagination?.nextCursor ?? r.nextCursor ?? null,
  };
}

export async function sendInboxMessage(
  conversationId: string, accountId: string, text: string, mediaUrl?: string,
) {
  return lateFetch<{ id?: string }>(
    `/inbox/conversations/${encodeURIComponent(conversationId)}/messages`,
    { method: "POST", body: JSON.stringify({ accountId, message: text, ...(mediaUrl ? { mediaUrl } : {}) }) },
  );
}
