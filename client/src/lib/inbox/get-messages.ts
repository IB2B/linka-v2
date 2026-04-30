import { inboxFetch } from "./inbox-fetch";
import type { Message } from "./inbox.types";

export async function getMessages(conversationId: string) {
  return inboxFetch<{ messages: Message[]; nextCursor: string | null }>(
    `/api/inbox/conversations/${encodeURIComponent(conversationId)}/messages`,
  );
}
