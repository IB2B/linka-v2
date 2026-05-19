import type { Response, NextFunction } from "express";
import { db } from "../lib/db";
import type { AuthRequest } from "../middleware/auth";

const QUERY = `
  SELECT t.id, t.subject, t.status, t.priority, t.category, t.rating,
         t.created_at, t.updated_at, t.last_viewed_at,
         EXISTS(
           SELECT 1 FROM support_ticket_replies r
           WHERE r.ticket_id = t.id AND r.is_admin = TRUE
             AND r.created_at > IFNULL(t.last_viewed_at, '1970-01-01')
         ) AS has_unread
  FROM support_tickets t
  WHERE t.user_id = ? ORDER BY t.created_at DESC LIMIT 50`;

export async function listUserTickets(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const [rows] = await db.query<any[]>(QUERY, [req.user!.id]);
    res.json({ tickets: rows.map((r) => ({
      id: r.id, subject: r.subject, status: r.status, priority: r.priority,
      category: r.category, rating: r.rating ?? null,
      createdAt: r.created_at, updatedAt: r.updated_at,
      hasUnread: Boolean(r.has_unread),
    })) });
  } catch (e) { next(e); }
}
