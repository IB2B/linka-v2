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
    const [rows] = await db.query<any[]>("SELECT status FROM users WHERE id = ?", [payload.sub]);
    if (!rows.length || rows[0].status === "SUSPENDED") {
      res.status(401).json({ error: "Account inactive." }); return;
    }
    req.user = { id: payload.sub, role: payload.role };
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
