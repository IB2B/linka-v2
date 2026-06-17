// Sentinel accountId marking a LinkedIn/Unipile thread, so the inbox provider
// router dispatches to Unipile instead of Late.
export const LINKEDIN_DM_ACCOUNT_ID = "linkedin-dm";
export const MAX_CHAT_PAGES = 10;

export type UnipileChat = {
  id: string;
  name?: string | null;
  unread_count?: number;
  timestamp?: string | number;
  lastMessage?: { text?: string } | null;
};
export type UnipileChatList = { items?: UnipileChat[]; cursor?: string | null };

export type UnipileMessage = {
  id: string;
  text?: string | null;
  timestamp?: string | number;
  is_sender?: boolean | number;
};
export type UnipileMessageList = { items?: UnipileMessage[]; cursor?: string | null };

export type UnipileAccount = { id: string; type?: string; name?: string | null };
export type UnipileAccountList = { items?: UnipileAccount[] };

export type HostedAuthResp = { object?: string; url?: string };
