import type { Response, NextFunction } from "express";
import { authenticate, requireRole, type AuthRequest } from "./auth";

export type { AuthRequest };

export function adminOnly(req: AuthRequest, res: Response, next: NextFunction): void {
  authenticate(req, res, (err?: unknown) => {
    if (err) return next(err);
    requireRole("ADMIN")(req, res, next);
  });
}
