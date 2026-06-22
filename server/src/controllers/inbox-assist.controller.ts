import type { Response } from "express";

import type { AuthRequest } from "../middleware/auth";
import { assistReply } from "../services/inbox-assist.service";
import { providerCanAccess, providerMessages } from "../lib/inbox-provider";
import { rateLimit } from "../lib/rate-limit";

const ASSIST_WINDOW = 60 * 60 * 1000;

type Msg = { direction: "incoming" | "outgoing"; text: string };

export async function assist(req: AuthRequest, res: Response) {
  const limit = rateLimit(`assist:${req.user!.id}`, 20, ASSIST_WINDOW);
  if (!limit.allowed) {
    res.status(429).json({ error: "Too many assist requests.", retryAfterMs: limit.retryAfterMs });
    return;
  }
  const id = String(req.params.id);
  const accountId = typeof req.query.accountId === "string" ? req.query.accountId : "";
  if (!accountId) { res.status(400).json({ error: "accountId is required" }); return; }
  if (!(await providerCanAccess(req.user!.id, accountId))) { res.status(403).json({ error: "Account not accessible." }); return; }
  const data = await providerMessages(req.user!.id, accountId, id);
  const thread: Msg[] = (data.messages ?? []).map((m) => ({
    direction: m.direction === "outgoing" ? "outgoing" : "incoming",
    text: m.text ?? m.body ?? "[Attachment]",
  }));
  if (thread.length === 0) {
    res.status(400).json({ error: "No messages to triage." });
    return;
  }
  const result = await assistReply(req.user!.id, thread);
  res.json(result);
}
