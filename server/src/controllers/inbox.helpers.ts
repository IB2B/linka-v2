import type { RawConversation, RawMessage } from "../lib/late-inbox";

export function mapConversation(c: RawConversation) {
  return {
    id: c._id ?? c.id,
    platform: c.platform,
    accountId: c.accountId ?? null,
    participantName: c.participant?.name ?? c.participant?.username ?? "Unknown",
    participantAvatar: c.participant?.avatar ?? null,
    lastMessage: c.lastMessage?.text ?? "",
    lastMessageAt: c.lastMessage?.createdAt ?? c.updatedAt ?? null,
    unread: (c.unreadCount ?? 0) > 0,
  };
}

export function mapMessage(m: RawMessage) {
  return {
    id: m._id ?? m.id,
    text: m.text ?? m.body ?? "",
    direction: m.direction === "outgoing" ? "outgoing" : "incoming",
    senderName: m.sender?.name ?? null,
    createdAt: m.createdAt ?? null,
  };
}
