import type { Response, NextFunction } from "express";
import type { RowDataPacket } from "mysql2";
import { db } from "../lib/db";
import type { AuthRequest } from "../middleware/auth";

interface Row extends RowDataPacket {
  id: string;
  subject: string;
  priority: "low" | "normal" | "high" | "urgent";
  status: "open" | "pending" | "closed";
  created_at: Date;
  admin_seen_at: Date | null;
  first_name: string;
  last_name: string;
}

const QUERY = `
  SELECT t.id, t.subject, t.priority, t.status, t.created_at, t.admin_seen_at,
         u.first_name, u.last_name
  FROM support_tickets t
  JOIN users u ON u.id = t.user_id
  WHERE t.status <> 'closed'
    AND t.created_at >= DATE_SUB(NOW(), INTERVAL 14 DAY)
  ORDER BY FIELD(t.priority, 'urgent', 'high', 'normal', 'low'),
           t.created_at DESC
  LIMIT 12`;

export async function listAdminNotifications(
  _req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    const [rows] = await db.query<Row[]>(QUERY);
    res.json({
      items: rows.map((r) => ({
        id: r.id,
        subject: r.subject,
        priority: r.priority,
        from: `${r.first_name} ${r.last_name}`.trim() || "User",
        createdAt: r.created_at.toISOString(),
        seenAt: r.admin_seen_at ? r.admin_seen_at.toISOString() : null,
      })),
    });
  } catch (e) { next(e); }
}
