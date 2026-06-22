import type { RawConversation, RawMessage } from "./late-inbox";
import { LINKEDIN_DM_ACCOUNT_ID, type UnipileChat, type UnipileMessage } from "./unipile-types";

// Unipile timestamps are ISO strings; pass them through, normalize any numerics.
function toIso(ts?: string | number): string | undefined {
  if (ts == null) return undefined;
  if (typeof ts === "string") return ts;
  return new Date(ts < 1e12 ? ts * 1000 : ts).toISOString();
}

export function toRawConversation(c: UnipileChat): RawConversation {
  const at = toIso(c.timestamp);
  return {
    id: c.id,
    platform: "linkedin",
    accountId: LINKEDIN_DM_ACCOUNT_ID,
    participantName: c.name ?? "LinkedIn member",
    participantPicture: null,
    lastMessage: { text: c.lastMessage?.text ?? "", createdAt: at },
    updatedTime: at,
    unreadCount: c.unread_count ?? 0,
    url: null,
  } as RawConversation & { url: string | null };
}

// Unipile gives is_sender, so direction is exact (no guessing).
export function toRawMessage(m: UnipileMessage): RawMessage {
  return {
    id: m.id,
    message: m.text ?? "",
    direction: m.is_sender ? "outgoing" : "incoming",
    createdAt: toIso(m.timestamp),
  } as RawMessage;
}
