import type { Request, Response, NextFunction } from "express";
import * as Sentry from "@sentry/node";
import { LateApiError } from "../lib/late-api";

// A blanket 500 with the message stripped is why "fine locally, broken in prod"
// costs a log dive: the browser is told nothing it can act on. Upstream 4xx are
// the provider's verdict on our request — not an internal detail — so they keep
// their status and message. Real 5xx stay opaque.
export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof Error) Sentry.captureException(err);
  console.error(err);

  if (err instanceof LateApiError && err.status >= 400 && err.status < 500) {
    res.status(err.status).json({ error: err.message.slice(0, 300) });
    return;
  }

  const expose = process.env.NODE_ENV !== "production" && err instanceof Error;
  res.status(500).json({ error: expose ? (err as Error).message : "Internal server error" });
}
