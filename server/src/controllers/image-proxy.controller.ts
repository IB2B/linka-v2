import type { Request, Response, NextFunction } from "express";
import { hostnameIsPublic, readBoundedBody } from "../lib/image-proxy-guards";

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
    if (!(await hostnameIsPublic(url.hostname))) { res.status(400).end(); return; }
    const upstream = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 linka-image-proxy" },
      redirect: "error",
    });
    if (!upstream.ok) { res.status(upstream.status).end(); return; }
    const ct = (upstream.headers.get("content-type") ?? "").split(";")[0].trim();
    if (!ALLOWED_CONTENT_TYPES.has(ct)) { res.status(400).end(); return; }
    const cl = Number(upstream.headers.get("content-length") ?? 0);
    const buf = await readBoundedBody(upstream.body, cl);
    res.setHeader("content-type", ct);
    res.setHeader("cache-control", "public, max-age=86400, immutable");
    res.setHeader("x-content-type-options", "nosniff");
    res.send(buf);
  } catch (e) { next(e); }
}
