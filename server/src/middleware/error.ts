import type { Request, Response, NextFunction } from "express";

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction): void {
  console.error(err);
  const expose = process.env.NODE_ENV !== "production" && err instanceof Error;
  res.status(500).json({ error: expose ? (err as Error).message : "Internal server error" });
}
