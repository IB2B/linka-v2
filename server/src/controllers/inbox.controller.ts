import type { Response } from "express";
import { z } from "zod";

import type { AuthRequest } from "../middleware/auth";
import {
  listInboxConversations, listInboxMessages, sendInboxMessage,
} from "../lib/late-inbox";
import type { RawConversation } from "../lib/late-inbox";
import { INBOX_DM_PLATFORMS } from "../lib/inbox-platforms";
import { userOwnsAccount } from "../lib/inbox-account-guard";
import { mapConversation, mapMessage } from "./inbox.helpers";

export async function getConversations(req: AuthRequest, res: Response) {
  const platform = typeof req.query.platform === "string" ? req.query.platform : undefined;
  if (platform && !INBOX_DM_PLATFORMS.has(platform)) {
    res.json({ conversations: [], unsupported: true, platform });
    return;
  }
  const dm = (raw: RawConversation[]) => raw.filter((c) => INBOX_DM_PLATFORMS.has(c.platform));
  const data = await listInboxConversations(req.user!.id, platform);
  const raw = data.conversations ?? [];
  res.json({ conversations: dm(raw).map(mapConversation) });
}

export async function getMessages(req: AuthRequest, res: Response) {
  const id = String(req.params.id);
  const cursor = typeof req.query.cursor === "string" ? req.query.cursor : undefined;
  const accountId = typeof req.query.accountId === "string" ? req.query.accountId : "";
  if (!accountId) { res.status(400).json({ error: "accountId is required" }); return; }
  if (!(await userOwnsAccount(req.user!.id, accountId))) { res.status(403).json({ error: "Account not accessible." }); return; }
  const data = await listInboxMessages(id, accountId, cursor);
  res.json({ messages: (data.messages ?? []).map(mapMessage), nextCursor: data.nextCursor ?? null });
}

const replySchema = z.object({
  text: z.string().trim().max(5000).default(""),
  accountId: z.string().min(1),
  mediaUrl: z.string().url().optional(),
});

export async function postReply(req: AuthRequest, res: Response) {
  const parsed = replySchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: "Invalid request." }); return; }
  if (!parsed.data.text && !parsed.data.mediaUrl) {
    res.status(400).json({ error: "Message or attachment is required." }); return;
  }
  if (!(await userOwnsAccount(req.user!.id, parsed.data.accountId))) {
    res.status(403).json({ error: "Account not accessible." }); return;
  }
  const id = String(req.params.id);
  const sent = await sendInboxMessage(id, parsed.data.accountId, parsed.data.text, parsed.data.mediaUrl);
  res.status(201).json({ id: sent.id ?? null });
}
