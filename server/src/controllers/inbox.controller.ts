import type { Response } from "express";
import { z } from "zod";

import type { AuthRequest } from "../middleware/auth";
import {
  listInboxConversations, listInboxMessages, sendInboxMessage,
  type RawConversation,
} from "../lib/late-inbox";
import { INBOX_DM_PLATFORMS } from "../lib/inbox-platforms";
import { mapConversation, mapMessage } from "./inbox.helpers";

export async function getConversations(req: AuthRequest, res: Response) {
  const platform = typeof req.query.platform === "string" ? req.query.platform : undefined;
  if (platform && !INBOX_DM_PLATFORMS.has(platform)) {
    res.json({ conversations: [], unsupported: true, platform });
    return;
  }
  const dm = (raw: RawConversation[]) => raw.filter((c) => INBOX_DM_PLATFORMS.has(c.platform));
  const data = await listInboxConversations(req.user!.id, platform);
  res.json({ conversations: dm(data.conversations ?? []).map(mapConversation) });
}

export async function getMessages(req: AuthRequest, res: Response) {
  const id = String(req.params.id);
  const cursor = typeof req.query.cursor === "string" ? req.query.cursor : undefined;
  const accountId = typeof req.query.accountId === "string" ? req.query.accountId : "";
  if (!accountId) { res.status(400).json({ error: "accountId is required" }); return; }
  const data = await listInboxMessages(id, accountId, cursor);
  res.json({ messages: (data.messages ?? []).map(mapMessage), nextCursor: data.nextCursor ?? null });
}

const replySchema = z.object({
  text: z.string().trim().min(1).max(5000),
  accountId: z.string().min(1),
});

export async function postReply(req: AuthRequest, res: Response) {
  const parsed = replySchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: "Message is required." }); return; }
  const id = String(req.params.id);
  const sent = await sendInboxMessage(id, parsed.data.accountId, parsed.data.text);
  res.status(201).json({ id: sent.id ?? null });
}
