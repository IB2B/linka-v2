import {
  listInboxConversations, listInboxMessages, sendInboxMessage, type RawConversation,
} from "./late-inbox";
import { INBOX_DM_PLATFORMS } from "./inbox-platforms";
import { userOwnsAccount } from "./inbox-account-guard";
import {
  LINKUP_ACCOUNT_ID, listLinkupConversations, listLinkupMessages, sendLinkupMessage,
} from "./linkup-inbox";
import { hasLinkupAccount } from "./linkup-account";

const isLinkedin = (accountId: string) => accountId === LINKUP_ACCOUNT_ID;

// Late doesn't serve LinkedIn DMs, so strip linkedin from its results and source
// those from Linkup instead.
async function lateDmConversations(userId: string, platform?: string): Promise<RawConversation[]> {
  const data = await listInboxConversations(userId, platform);
  return (data.conversations ?? []).filter(
    (c) => INBOX_DM_PLATFORMS.has(c.platform) && c.platform !== "linkedin");
}

async function safeList(
  label: string, fn: () => Promise<RawConversation[]>,
): Promise<RawConversation[]> {
  try {
    return await fn();
  } catch (e) {
    console.error(`[inbox] ${label} conversations unavailable:`, e);
    return [];
  }
}

async function linkupConversations(userId: string): Promise<RawConversation[]> {
  return (await hasLinkupAccount(userId)) ? listLinkupConversations(userId) : [];
}

// Every path is wrapped in safeList so a single provider outage (Late timeout,
// Linkup downtime, an empty/missing account) degrades to partial/empty results
// instead of 500-ing and blanking the whole inbox.
export async function providerConversations(
  userId: string, platform?: string,
): Promise<RawConversation[]> {
  if (platform === "linkedin") return safeList("LinkedIn", () => linkupConversations(userId));
  if (platform) return safeList("Late", () => lateDmConversations(userId, platform));
  const [late, linkedin] = await Promise.all([
    safeList("Late", () => lateDmConversations(userId)),
    safeList("LinkedIn", () => linkupConversations(userId)),
  ]);
  return [...linkedin, ...late];
}

export async function providerCanAccess(userId: string, accountId: string): Promise<boolean> {
  return isLinkedin(accountId) ? hasLinkupAccount(userId) : userOwnsAccount(userId, accountId);
}

export async function providerMessages(
  userId: string, accountId: string, conversationId: string, cursor?: string,
) {
  return isLinkedin(accountId)
    ? listLinkupMessages(userId, conversationId, cursor)
    : listInboxMessages(conversationId, accountId, cursor);
}

export async function providerSend(
  userId: string, accountId: string, conversationId: string, text: string, mediaUrl?: string,
) {
  return isLinkedin(accountId)
    ? sendLinkupMessage(userId, conversationId, text, mediaUrl)
    : sendInboxMessage(conversationId, accountId, text, mediaUrl);
}
