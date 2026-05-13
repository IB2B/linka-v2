import type { RawConversation, RawMessage } from "../lib/late-inbox";

export function mapConversation(c: RawConversation) {
  const lastMsg = typeof c.lastMessage === "string"
    ? c.lastMessage
    : c.lastMessage?.text ?? "";
  const lastAt = typeof c.lastMessage === "object"
    ? (c.lastMessage?.createdAt ?? c.updatedTime ?? c.updatedAt ?? null)
    : (c.updatedTime ?? c.updatedAt ?? null);
  const lastDir = typeof c.lastMessage === "object"
    ? (c.lastMessage?.direction ?? null)
    : null;
  return {
    id: c._id ?? c.id,
    platform: c.platform,
    accountId: c.accountId ?? null,
    participantName: c.participantName ?? c.participant?.name
      ?? c.participantUsername ?? c.participant?.username ?? "Unknown",
    participantUsername: c.participantUsername ?? c.participant?.username ?? null,
    participantAvatar: c.participantPicture ?? c.participant?.avatar ?? null,
    lastMessage: lastMsg,
    lastMessageDirection: lastDir === "outgoing" ? "outgoing" : lastDir === "incoming" ? "incoming" : null,
    lastMessageAt: lastAt,
    unread: (c.unreadCount ?? 0) > 0,
    url: (c as any).url ?? null,
  };
}

export function mapMessage(m: RawMessage) {
  return {
    id: m._id ?? m.id,
    text: m.message ?? m.text ?? m.body ?? "",
    direction: m.direction === "outgoing" ? "outgoing" : "incoming",
    senderName: m.senderName ?? m.sender?.name ?? null,
    createdAt: m.createdAt ?? null,
  };
}
