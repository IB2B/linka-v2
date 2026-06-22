import { unipileFetch, unipileForm, UnipileApiError } from "./unipile-api";
import { getLinkedinAccount } from "./unipile-account";
import { toRawConversation, toRawMessage } from "./unipile-map";
import {
  LINKEDIN_DM_ACCOUNT_ID, MAX_CHAT_PAGES,
  type UnipileChatList, type UnipileMessageList,
} from "./unipile-types";
import type { RawConversation, RawMessage } from "./late-inbox";

export { LINKEDIN_DM_ACCOUNT_ID };

export async function listUnipileConversations(userId: string): Promise<RawConversation[]> {
  const acc = await getLinkedinAccount(userId);
  if (!acc) return [];
  const out: RawConversation[] = [];
  let cursor: string | undefined;
  for (let i = 0; i < MAX_CHAT_PAGES; i++) {
    const qs = new URLSearchParams({ account_id: acc.accountId, limit: "50" });
    if (cursor) qs.set("cursor", cursor);
    const r = await unipileFetch<UnipileChatList>(`/chats?${qs.toString()}`);
    out.push(...(r.items ?? []).map(toRawConversation));
    if (!r.cursor) break;
    cursor = r.cursor;
  }
  return out;
}

export async function listUnipileMessages(userId: string, chatId: string, cursor?: string) {
  const acc = await getLinkedinAccount(userId);
  if (!acc) return { messages: [] as RawMessage[], nextCursor: null };
  const qs = new URLSearchParams({ limit: "50" });
  if (cursor) qs.set("cursor", cursor);
  const r = await unipileFetch<UnipileMessageList>(
    `/chats/${encodeURIComponent(chatId)}/messages?${qs.toString()}`);
  return { messages: (r.items ?? []).map(toRawMessage), nextCursor: r.cursor ?? null };
}

export async function sendUnipileMessage(
  userId: string, chatId: string, text: string, _mediaUrl?: string,
) {
  const acc = await getLinkedinAccount(userId);
  if (!acc) throw new UnipileApiError(400, "LinkedIn not connected");
  const r = await unipileForm<{ message_id?: string; id?: string }>(
    `/chats/${encodeURIComponent(chatId)}/messages`, { text });
  return { id: r.message_id ?? r.id ?? null };
}
