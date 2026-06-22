import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth";
import { providerCanAccess, providerMessages } from "../lib/inbox-provider";
import { summarizeThread } from "../services/inbox-summarize.service";

export async function summarize(req: AuthRequest, res: Response) {
  const id = String(req.params.id);
  const accountId = typeof req.query.accountId === "string" ? req.query.accountId : "";
  if (!accountId) { res.status(400).json({ error: "accountId is required" }); return; }
  if (!(await providerCanAccess(req.user!.id, accountId))) { res.status(403).json({ error: "Account not accessible." }); return; }
  const data = await providerMessages(req.user!.id, accountId, id);
  const thread = (data.messages ?? []).map((m) => ({
    direction: m.direction === "outgoing" ? "outgoing" : "incoming" as "outgoing" | "incoming",
    text: m.text ?? m.body ?? "[Attachment]",
  }));
  if (thread.length === 0) { res.status(400).json({ error: "No messages to summarize." }); return; }
  const summary = await summarizeThread(thread);
  res.json({ summary });
}
