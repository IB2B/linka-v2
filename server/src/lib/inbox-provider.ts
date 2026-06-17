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

export async function providerConversations(
  userId: string, platform?: string,
): Promise<RawConversation[]> {
  if (platform === "linkedin") {
    return (await hasLinkedinAccount(userId)) ? listUnipileConversations(userId) : [];
  }
  if (platform) return lateDmConversations(userId, platform);
  const [late, hasLi] = await Promise.all([
    lateDmConversations(userId), hasLinkedinAccount(userId),
  ]);
  const linkedin = hasLi ? await listUnipileConversations(userId) : [];
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
