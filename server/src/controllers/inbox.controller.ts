import type { Response } from "express";
import { z } from "zod";

import type { AuthRequest } from "../middleware/auth";
import { LateApiError } from "../lib/late-api";
import {
  listInboxConversations, listInboxMessages, sendInboxMessage,
  type RawConversation, type RawMessage,
} from "../lib/late-inbox";
import { INBOX_MOCK_ENABLED, MOCK_CONVERSATIONS, MOCK_MESSAGES } from "../lib/inbox-mock";

function mapConversation(c: RawConversation) {
  return {
    id: c._id ?? c.id,
    platform: c.platform,
    accountId: c.accountId ?? null,
    participantName: c.participant?.name ?? c.participant?.username ?? "Unknown",
    participantAvatar: c.participant?.avatar ?? null,
    lastMessage: c.lastMessage?.text ?? "",
    lastMessageAt: c.lastMessage?.createdAt ?? c.updatedAt ?? null,
    unread: (c.unreadCount ?? 0) > 0,
  };
}

function mapMessage(m: RawMessage) {
  return {
    id: m._id ?? m.id,
    text: m.text ?? m.body ?? "",
    direction: m.direction === "outgoing" ? "outgoing" : "incoming",
    senderName: m.sender?.name ?? null,
    createdAt: m.createdAt ?? null,
  };
}

function shouldMock(e: unknown) {
  if (INBOX_MOCK_ENABLED) return true;
  if (e instanceof LateApiError && [402, 403, 404].includes(e.status)) return true;
  return false;
}

export async function getConversations(req: AuthRequest, res: Response) {
  const platform = typeof req.query.platform === "string" ? req.query.platform : undefined;
  const useMock = (raw: RawConversation[]) =>
    (platform ? raw.filter((c) => c.platform === platform) : raw).map(mapConversation);

  if (INBOX_MOCK_ENABLED) {
    res.json({ conversations: useMock(MOCK_CONVERSATIONS) });
    return;
  }
  try {
    const data = await listInboxConversations(req.user!.id, platform);
    res.json({ conversations: (data.conversations ?? []).map(mapConversation) });
  } catch (e) {
    if (shouldMock(e)) { res.json({ conversations: useMock(MOCK_CONVERSATIONS) }); return; }
    throw e;
  }
}

export async function getMessages(req: AuthRequest, res: Response) {
  const id = String(req.params.id);
  const cursor = typeof req.query.cursor === "string" ? req.query.cursor : undefined;
  const mock = () => ({
    messages: (MOCK_MESSAGES[id] ?? []).map(mapMessage),
    nextCursor: null,
  });

  if (INBOX_MOCK_ENABLED || id.startsWith("mock-")) { res.json(mock()); return; }
  try {
    const data = await listInboxMessages(id, cursor);
    res.json({
      messages: (data.messages ?? []).map(mapMessage),
      nextCursor: data.nextCursor ?? null,
    });
  } catch (e) {
    if (shouldMock(e)) { res.json(mock()); return; }
    throw e;
  }
}

const replySchema = z.object({ text: z.string().trim().min(1).max(5000) });

export async function postReply(req: AuthRequest, res: Response) {
  const parsed = replySchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: "Message is required." }); return; }
  const id = String(req.params.id);

  if (INBOX_MOCK_ENABLED || id.startsWith("mock-")) {
    const fake: RawMessage = {
      _id: `mock-reply-${Date.now()}`, text: parsed.data.text,
      direction: "outgoing", sender: { name: "You" }, createdAt: new Date().toISOString(),
    };
    (MOCK_MESSAGES[id] ??= []).push(fake);
    res.status(201).json({ id: fake._id });
    return;
  }
  try {
    const sent = await sendInboxMessage(id, parsed.data.text);
    res.status(201).json({ id: sent.id ?? null });
  } catch (e) {
    if (shouldMock(e)) { res.status(201).json({ id: null, mocked: true }); return; }
    throw e;
  }
}
