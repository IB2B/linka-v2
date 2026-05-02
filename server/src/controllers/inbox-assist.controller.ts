import type { Response } from "express";

import type { AuthRequest } from "../middleware/auth";
import { assistReply } from "../services/inbox-assist.service";
import { listInboxMessages } from "../lib/late-inbox";
import { INBOX_MOCK_ENABLED, MOCK_MESSAGES } from "../lib/inbox-mock";

type Msg = { direction: "incoming" | "outgoing"; text: string };

function fromMock(id: string): Msg[] {
  return (MOCK_MESSAGES[id] ?? []).map((m) => ({
    direction: m.direction === "outgoing" ? "outgoing" : "incoming",
    text: m.text ?? m.body ?? "",
  })).filter((m) => m.text);
}

export async function assist(req: AuthRequest, res: Response) {
  const id = String(req.params.id);
  let thread: Msg[];
  if (INBOX_MOCK_ENABLED || id.startsWith("mock-")) {
    thread = fromMock(id);
  } else {
    const data = await listInboxMessages(id);
    thread = (data.messages ?? []).map((m) => ({
      direction: m.direction === "outgoing" ? "outgoing" : "incoming",
      text: m.text ?? m.body ?? "",
    })).filter((m) => m.text);
  }
  if (thread.length === 0) {
    res.status(400).json({ error: "No messages to triage." });
    return;
  }
  const result = await assistReply(req.user!.id, thread);
  res.json(result);
}
