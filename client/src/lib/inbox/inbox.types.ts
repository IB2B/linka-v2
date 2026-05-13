export type InboxPlatform =
  | "facebook" | "instagram" | "twitter" | "bluesky"
  | "reddit" | "telegram" | "whatsapp" | "linkedin" | "youtube";

export type Conversation = {
  id: string;
  platform: InboxPlatform | string;
  accountId: string | null;
  participantName: string;
  participantUsername: string | null;
  participantAvatar: string | null;
  lastMessage: string;
  lastMessageDirection: "outgoing" | "incoming" | null;
  lastMessageAt: string | null;
  unread: boolean;
  url: string | null;
};

export type Message = {
  id: string;
  text: string;
  direction: "incoming" | "outgoing";
  senderName: string | null;
  createdAt: string | null;
};

export type InboxError = { error: string; status: number };
