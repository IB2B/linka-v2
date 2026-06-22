import { linkupFetch, LinkupApiError } from "./linkup-api";
import { getLinkupAccount } from "./linkup-account";
import { toRawConversation, toRawMessage } from "./linkup-map";
import {
  LINKUP_ACCOUNT_ID, MAX_INBOX_PAGES,
  type LinkupInboxResp, type LinkupConvResp,
} from "./linkup-types";
import type { RawConversation, RawMessage } from "./late-inbox";

export { LINKUP_ACCOUNT_ID };

export async function listLinkupConversations(userId: string): Promise<RawConversation[]> {
  const acc = await getLinkupAccount(userId);
  if (!acc) return [];
  const out: RawConversation[] = [];
  let cursor: string | undefined;
  for (let i = 0; i < MAX_INBOX_PAGES; i++) {
    const r = await linkupFetch<LinkupInboxResp>("/messages/inbox", {
      login_token: acc.loginToken, country: acc.country, total_results: 50, next_cursor: cursor,
    });
    out.push(...(r.data?.conversations ?? []).map(toRawConversation));
    const next = r.data?.next_cursor ?? null;
    if (!next) break;
    cursor = next;
  }
  return out;
}

export async function listLinkupMessages(userId: string, conversationId: string, cursor?: string) {
  const acc = await getLinkupAccount(userId);
  if (!acc) return { messages: [] as RawMessage[], nextCursor: null };
  const r = await linkupFetch<LinkupConvResp>("/messages/conversation", {
    login_token: acc.loginToken, conversation_id: conversationId,
    total_results: 50, cursor, country: acc.country,
  });
  const otherUrl = r.data?.profile_url;
  const msgs = (r.data?.messages ?? r.messages ?? []).map((m) => toRawMessage(m, otherUrl));
  return { messages: msgs, nextCursor: r.data?.next_cursor ?? null };
}

export async function sendLinkupMessage(
  userId: string, conversationId: string, text: string, mediaUrl?: string,
) {
  const acc = await getLinkupAccount(userId);
  if (!acc) throw new LinkupApiError(400, "LinkedIn not connected");
  // send-message addresses the recipient by profile URL, so resolve it from the thread.
  const conv = await linkupFetch<LinkupConvResp>("/messages/conversation", {
    login_token: acc.loginToken, conversation_id: conversationId, total_results: 1, country: acc.country,
  });
  const linkedinUrl = conv.data?.profile_url;
  if (!linkedinUrl) throw new LinkupApiError(400, "Could not resolve recipient profile");
  const r = await linkupFetch<{ data?: { id?: string } }>("/messages/send-message", {
    login_token: acc.loginToken, linkedin_url: linkedinUrl, message_text: text,
    country: acc.country, ...(mediaUrl ? { media_link: mediaUrl } : {}),
  });
  return { id: r.data?.id ?? null };
}
