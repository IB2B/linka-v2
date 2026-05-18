import type { Request, Response, NextFunction } from "express";
import { rateLimit } from "../lib/rate-limit";

type KeyFn = (req: Request) => string;

export function rateLimitMw(prefix: string, max: number, windowMs: number, keyFn?: KeyFn) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const key = `${prefix}:${keyFn ? keyFn(req) : req.ip ?? "unknown"}`;
    const r = rateLimit(key, max, windowMs);
    if (!r.allowed) {
      res.setHeader("Retry-After", Math.ceil(r.retryAfterMs / 1000));
      res.status(429).json({ error: "Too many requests. Try again shortly." });
      return;
    }
    next();
  };
}
