import type { Response, NextFunction } from "express";
import type { RowDataPacket } from "mysql2";
import { db } from "../lib/db";
import type { AuthRequest } from "../middleware/auth";

interface Row extends RowDataPacket {
  id: string;
  subject: string;
  status: "resolved" | "closed";
  closed_at: Date;
  last_viewed_at: Date | null;
}

const QUERY = `
  SELECT id, subject, status, closed_at, last_viewed_at
  FROM support_tickets
  WHERE user_id = ?
    AND status IN ('resolved', 'closed')
    AND closed_at IS NOT NULL
    AND closed_at >= DATE_SUB(NOW(), INTERVAL 14 DAY)
  ORDER BY closed_at DESC
  LIMIT 12`;

export async function listUserTicketNotifications(
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void> {
  try {
    const [rows] = await db.query<Row[]>(QUERY, [req.user!.id]);
    res.json({
      items: rows.map((r) => {
        const seen = r.last_viewed_at && r.last_viewed_at >= r.closed_at;
        return {
          id: r.id,
          subject: r.subject,
          status: r.status,
          closedAt: r.closed_at.toISOString(),
          seenAt: seen ? r.last_viewed_at!.toISOString() : null,
        };
      }),
    });
  } catch (e) { next(e); }
}
