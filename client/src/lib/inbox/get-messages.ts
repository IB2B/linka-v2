import { inboxFetch } from "./inbox-fetch";
import type { Message } from "./inbox.types";

export async function getMessages(conversationId: string, accountId: string | null) {
  const qs = accountId ? `?accountId=${encodeURIComponent(accountId)}` : "";
  return inboxFetch<{ messages: Message[]; nextCursor: string | null }>(
    `/api/inbox/conversations/${encodeURIComponent(conversationId)}/messages${qs}`,
  );
}
