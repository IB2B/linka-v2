import type { Response, NextFunction } from "express";
import { z } from "zod";
import { db } from "../lib/db";
import type { AuthRequest } from "../middleware/auth";
import { notifyUserOfTicketStatus } from "../lib/user-ticket-notify";

const schema = z.object({
  status: z.enum(["open", "pending", "resolved", "closed"]).optional(),
  priority: z.enum(["low", "normal", "high", "urgent"]).optional(),
});

type NewStatus = z.infer<typeof schema>["status"];

async function isStatusTransition(id: string, newStatus: NewStatus): Promise<boolean> {
  if (newStatus !== "resolved" && newStatus !== "closed") return false;
  const [[old]] = await db.query<any[]>(
    "SELECT status FROM support_tickets WHERE id = ? LIMIT 1", [id],
  );
  return Boolean(old && old.status !== newStatus);
}

export async function updateTicket(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = String(req.params.id);
    const parsed = schema.safeParse(req.body);
    if (!parsed.success || (!parsed.data.status && !parsed.data.priority)) {
      res.status(400).json({ error: "Invalid update" }); return;
    }
    const sets: string[] = []; const params: any[] = [];
    const newStatus = parsed.data.status;
    const shouldNotify = await isStatusTransition(id, newStatus);
    if (newStatus) {
      sets.push("status = ?"); params.push(newStatus);
      sets.push(newStatus === "closed" ? "closed_at = NOW()" : "closed_at = NULL");
    }
    if (parsed.data.priority) { sets.push("priority = ?"); params.push(parsed.data.priority); }
    params.push(id);
    const [r] = await db.query<any>(
      `UPDATE support_tickets SET ${sets.join(", ")} WHERE id = ?`, params,
    );
    if (!r || (r as any).affectedRows === 0) { res.status(404).json({ error: "Not found" }); return; }
    if (shouldNotify && (newStatus === "resolved" || newStatus === "closed")) {
      notifyUserOfTicketStatus(id, newStatus)
        .catch((e) => console.error("[user-ticket-notify]", e));
    }
    res.json({ ok: true });
  } catch (e) { next(e); }
}
