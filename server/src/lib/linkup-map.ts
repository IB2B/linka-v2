import type { RawConversation, RawMessage } from "./late-inbox";
import { LINKUP_ACCOUNT_ID, type LinkupConversation, type LinkupMessage } from "./linkup-types";

// LinkedIn timestamps are epoch milliseconds; a few endpoints emit seconds.
// Normalize both to an ISO string so the shared inbox mappers can read them.
function toIso(ts?: number): string | undefined {
  if (!ts) return undefined;
  return new Date(ts < 1e12 ? ts * 1000 : ts).toISOString();
}

export function toRawConversation(c: LinkupConversation): RawConversation {
  const at = toIso(c.last_message?.time);
  return {
    id: c.conversation_id,
    platform: "linkedin",
    accountId: LINKUP_ACCOUNT_ID,
    participantName: c.participant?.name,
    participantUsername: c.participant?.headline ?? null,
    participantPicture: c.participant?.profile_picture ?? null,
    lastMessage: { text: c.last_message?.text ?? "", createdAt: at },
    updatedTime: at,
    unreadCount: c.unread ?? 0,
    url: c.participant?.profile_url ?? null,
  } as RawConversation & { url: string | null };
}

// Direction is inferred by comparing the message sender's profile URL to the
// thread's other member (returned as data.profile_url): same → incoming.
export function toRawMessage(m: LinkupMessage, otherUrl?: string): RawMessage {
  const senderUrl = m.sender_info?.profile_url ?? m.sender?.profile_url;
  const direction = senderUrl && otherUrl
    ? (senderUrl === otherUrl ? "incoming" : "outgoing")
    : "incoming";
  return {
    id: m.entity_urn ?? m.id,
    message: m.text ?? "",
    direction,
    senderName: m.sender_info?.name ?? m.sender?.name ?? null,
    createdAt: toIso(m.timestamp) ?? null,
  } as RawMessage;
}
