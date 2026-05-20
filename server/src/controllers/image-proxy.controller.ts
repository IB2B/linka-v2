import type { Request, Response, NextFunction } from "express";
import { resolvePinnedHost } from "../lib/image-proxy-guards";
import { fetchPinned } from "../lib/image-proxy-fetch";

const ALLOWED_CONTENT_TYPES = new Set([
  "image/jpeg", "image/png", "image/webp", "image/gif", "image/avif",
]);

const ALLOWED_HOSTS = new Set([
  "media.licdn.com",
  "pbs.twimg.com",
  "graph.facebook.com",
  "platform-lookaside.fbsbx.com",
  "i.redditmedia.com",
  "styles.redditmedia.com",
  "www.redditstatic.com",
  "preview.redd.it",
  "i.pravatar.cc",
  "unavatar.io",
  "i.pinimg.com",
  "s.pinimg.com",
]);

const ALLOWED_SUFFIXES = [".cdninstagram.com", ".fbsbx.com", ".fbcdn.net", ".redd.it", ".redditmedia.com"];

function isAllowed(hostname: string): boolean {
  if (ALLOWED_HOSTS.has(hostname)) return true;
  return ALLOWED_SUFFIXES.some((s) => hostname.endsWith(s));
}

export async function proxyImage(
  req: Request, res: Response, next: NextFunction,
): Promise<void> {
  try {
    const raw = typeof req.query.url === "string" ? req.query.url : "";
    if (!raw) { res.status(400).end(); return; }
    const url = new URL(raw);
    if (url.protocol !== "https:" || !isAllowed(url.hostname)) {
      res.status(400).end(); return;
    }
    const pinned = await resolvePinnedHost(url.hostname);
    if (!pinned) { res.status(400).end(); return; }
    const r = await fetchPinned(url, pinned, "Mozilla/5.0 linka-image-proxy");
    if (r.status < 200 || r.status >= 300) { res.status(r.status).end(); return; }
    if (!ALLOWED_CONTENT_TYPES.has(r.contentType)) { res.status(400).end(); return; }
    res.setHeader("content-type", r.contentType);
    res.setHeader("cache-control", "public, max-age=86400, immutable");
    res.setHeader("x-content-type-options", "nosniff");
    res.send(r.body);
  } catch (e) { next(e); }
}
