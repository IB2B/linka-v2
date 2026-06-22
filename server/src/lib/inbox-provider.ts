import {
  listInboxConversations, listInboxMessages, sendInboxMessage, type RawConversation,
} from "./late-inbox";
import { INBOX_DM_PLATFORMS } from "./inbox-platforms";
import { userOwnsAccount } from "./inbox-account-guard";
import {
  LINKEDIN_DM_ACCOUNT_ID, listUnipileConversations, listUnipileMessages, sendUnipileMessage,
} from "./unipile-inbox";
import { hasLinkedinAccount } from "./unipile-account";

const isLinkedin = (accountId: string) => accountId === LINKEDIN_DM_ACCOUNT_ID;

// Late doesn't serve LinkedIn DMs, so strip linkedin from its results and source
// those from Unipile instead.
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
    console.warn(`[inbox] ${label} conversations unavailable:`, e instanceof Error ? e.message : e);
    return [];
  }
}

async function linkedinConversations(userId: string): Promise<RawConversation[]> {
  return (await hasLinkedinAccount(userId)) ? listUnipileConversations(userId) : [];
}

// Every path is wrapped in safeList so a single provider outage (Late timeout,
// Unipile downtime, an empty/missing account) degrades to partial/empty results
// instead of 500-ing and blanking the whole inbox.
export async function providerConversations(
  userId: string, platform?: string,
): Promise<RawConversation[]> {
  if (platform === "linkedin") return safeList("LinkedIn", () => linkedinConversations(userId));
  if (platform) return safeList("Late", () => lateDmConversations(userId, platform));
  const [late, linkedin] = await Promise.all([
    safeList("Late", () => lateDmConversations(userId)),
    safeList("LinkedIn", () => linkedinConversations(userId)),
  ]);
  return [...linkedin, ...late];
}

export async function providerCanAccess(userId: string, accountId: string): Promise<boolean> {
  return isLinkedin(accountId) ? hasLinkedinAccount(userId) : userOwnsAccount(userId, accountId);
}

export async function providerMessages(
  userId: string, accountId: string, conversationId: string, cursor?: string,
) {
  return isLinkedin(accountId)
    ? listUnipileMessages(userId, conversationId, cursor)
    : listInboxMessages(conversationId, accountId, cursor);
}

export async function providerSend(
  userId: string, accountId: string, conversationId: string, text: string, mediaUrl?: string,
) {
  return isLinkedin(accountId)
    ? sendUnipileMessage(userId, conversationId, text, mediaUrl)
    : sendInboxMessage(conversationId, accountId, text, mediaUrl);
}
