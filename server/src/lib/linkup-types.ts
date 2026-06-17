// Sentinel accountId used across the inbox to mark a LinkedIn/LinkupAPI thread,
// so the provider router knows to dispatch to Linkup instead of Late.
export const LINKUP_ACCOUNT_ID = "linkup-linkedin";
export const MAX_INBOX_PAGES = 10;

export type LinkupParticipant = {
  name?: string; headline?: string; profile_url?: string; profile_picture?: string;
};

export type LinkupConversation = {
  conversation_id: string;
  participant?: LinkupParticipant;
  last_message?: { text?: string; time?: number; sender?: LinkupParticipant };
  unread?: number;
};

export type LinkupInboxResp = {
  status?: string;
  data?: { conversations?: LinkupConversation[]; next_cursor?: string | null };
};

export type LinkupMessage = {
  entity_urn?: string; id?: string; text?: string; timestamp?: number;
  sender?: LinkupParticipant; sender_info?: LinkupParticipant; message_type?: string;
};

export type LinkupConvResp = {
  status?: string;
  data?: { profile_url?: string; messages?: LinkupMessage[]; next_cursor?: string | null };
  messages?: LinkupMessage[];
};
