import {
  listInboxConversations, listInboxMessages, sendInboxMessage, type RawConversation,
} from "./late-inbox";
import { INBOX_DM_PLATFORMS } from "./inbox-platforms";
import { userOwnsAccount } from "./inbox-account-guard";
import {
  LINKUP_ACCOUNT_ID, listLinkupConversations, listLinkupMessages, sendLinkupMessage,
} from "./linkup-inbox";
import { hasLinkupAccount } from "./linkup-account";

const isLinkup = (accountId: string) => accountId === LINKUP_ACCOUNT_ID;

// Late doesn't serve LinkedIn DMs, so we strip linkedin from its results and
// source those from Linkup instead.
async function lateDmConversations(userId: string, platform?: string): Promise<RawConversation[]> {
  const data = await listInboxConversations(userId, platform);
  return (data.conversations ?? []).filter(
    (c) => INBOX_DM_PLATFORMS.has(c.platform) && c.platform !== "linkedin");
}

export async function providerConversations(
  userId: string, platform?: string,
): Promise<RawConversation[]> {
  if (platform === "linkedin") {
    return (await hasLinkupAccount(userId)) ? listLinkupConversations(userId) : [];
  }
  if (platform) return lateDmConversations(userId, platform);
  const [late, hasLi] = await Promise.all([
    lateDmConversations(userId), hasLinkupAccount(userId),
  ]);
  const linkedin = hasLi ? await listLinkupConversations(userId) : [];
  return [...linkedin, ...late];
}

export async function providerCanAccess(userId: string, accountId: string): Promise<boolean> {
  return isLinkup(accountId) ? hasLinkupAccount(userId) : userOwnsAccount(userId, accountId);
}

export async function providerMessages(
  userId: string, accountId: string, conversationId: string, cursor?: string,
) {
  return isLinkup(accountId)
    ? listLinkupMessages(userId, conversationId, cursor)
    : listInboxMessages(conversationId, accountId, cursor);
}

export async function providerSend(
  userId: string, accountId: string, conversationId: string, text: string, mediaUrl?: string,
) {
  return isLinkup(accountId)
    ? sendLinkupMessage(userId, conversationId, text, mediaUrl)
    : sendInboxMessage(conversationId, accountId, text, mediaUrl);
}
