import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../lib/jwt";
import { db } from "../lib/db";

export interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

export async function authenticate(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  const token = req.cookies?.token as string | undefined;
  if (!token) { res.status(401).json({ error: "Unauthorized" }); return; }

  try {
    const payload = verifyToken(token);
    const [rows] = await db.query<any[]>(
      "SELECT role, status, session_version, deleted_at FROM users WHERE id = ?", [payload.sub],
    );
    if (!rows.length || rows[0].status === "SUSPENDED" || rows[0].deleted_at) {
      res.status(401).json({ error: "Account inactive." }); return;
    }
    if (Number(rows[0].session_version ?? 0) !== Number(payload.sv ?? 0)) {
      res.status(401).json({ error: "Session expired." }); return;
    }
    req.user = { id: payload.sub, role: rows[0].role };
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired session" });
  }
}

export function requireRole(...roles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }
    next();
  };
}
