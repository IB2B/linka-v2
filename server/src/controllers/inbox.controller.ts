import type { Response } from "express";
import { z } from "zod";

import type { AuthRequest } from "../middleware/auth";
import { INBOX_DM_PLATFORMS } from "../lib/inbox-platforms";
import {
  providerConversations, providerMessages, providerSend, providerCanAccess,
} from "../lib/inbox-provider";
import { LinkupApiError } from "../lib/linkup-api";
import { mapConversation, mapMessage } from "./inbox.helpers";

export async function getConversations(req: AuthRequest, res: Response) {
  const platform = typeof req.query.platform === "string" ? req.query.platform : undefined;
  if (platform && !INBOX_DM_PLATFORMS.has(platform)) {
    res.json({ conversations: [], unsupported: true, platform });
    return;
  }
  try {
    const raw = await providerConversations(req.user!.id, platform);
    res.json({ conversations: raw.map(mapConversation) });
  } catch (e) {
    // Don't leak the raw provider response to the client; map to a clean code.
    if (e instanceof LinkupApiError) {
      res.status(502).json({ error: "linkedin_unavailable" });
      return;
    }
    throw e;
  }
}

export async function getMessages(req: AuthRequest, res: Response) {
  const id = String(req.params.id);
  const cursor = typeof req.query.cursor === "string" ? req.query.cursor : undefined;
  const accountId = typeof req.query.accountId === "string" ? req.query.accountId : "";
  if (!accountId) { res.status(400).json({ error: "accountId is required" }); return; }
  if (!(await providerCanAccess(req.user!.id, accountId))) {
    res.status(403).json({ error: "Account not accessible." }); return;
  }
  const data = await providerMessages(req.user!.id, accountId, id, cursor);
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
  if (!(await providerCanAccess(req.user!.id, parsed.data.accountId))) {
    res.status(403).json({ error: "Account not accessible." }); return;
  }
  const id = String(req.params.id);
  const sent = await providerSend(
    req.user!.id, parsed.data.accountId, id, parsed.data.text, parsed.data.mediaUrl);
  res.status(201).json({ id: sent.id ?? null });
}
