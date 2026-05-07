import type { Response } from "express";

import type { AuthRequest } from "../middleware/auth";
import { assistReply } from "../services/inbox-assist.service";
import { listInboxMessages } from "../lib/late-inbox";

type Msg = { direction: "incoming" | "outgoing"; text: string };

export async function assist(req: AuthRequest, res: Response) {
  const id = String(req.params.id);
  const accountId = typeof req.query.accountId === "string" ? req.query.accountId : "";
  if (!accountId) { res.status(400).json({ error: "accountId is required" }); return; }
  const data = await listInboxMessages(id, accountId);
  const thread: Msg[] = (data.messages ?? []).map((m) => ({
    direction: m.direction === "outgoing" ? "outgoing" : "incoming",
    text: m.text ?? m.body ?? "",
  })).filter((m) => m.text);
  if (thread.length === 0) {
    res.status(400).json({ error: "No messages to triage." });
    return;
  }
  const result = await assistReply(req.user!.id, thread);
  res.json(result);
}
