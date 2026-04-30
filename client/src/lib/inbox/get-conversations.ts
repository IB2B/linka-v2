import { inboxFetch } from "./inbox-fetch";
import type { Conversation } from "./inbox.types";

export async function getConversations(platform?: string) {
  const qs = platform ? `?platform=${encodeURIComponent(platform)}` : "";
  return inboxFetch<{ conversations: Conversation[] }>(`/api/inbox/conversations${qs}`);
}
