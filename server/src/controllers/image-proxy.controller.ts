import type { Request, Response, NextFunction } from "express";

const ALLOWED_HOSTS = new Set([
  "media.licdn.com",
  "pbs.twimg.com",
  "scontent.cdninstagram.com",
  "scontent-arn2-1.cdninstagram.com",
  "scontent-fra3-1.cdninstagram.com",
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

export async function proxyImage(
  req: Request, res: Response, next: NextFunction,
): Promise<void> {
  try {
    const raw = typeof req.query.url === "string" ? req.query.url : "";
    if (!raw) { res.status(400).end(); return; }
    const url = new URL(raw);
    if (url.protocol !== "https:" || !ALLOWED_HOSTS.has(url.hostname)) {
      res.status(400).end(); return;
    }
    const upstream = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 linka-image-proxy" },
    });
    if (!upstream.ok) { res.status(upstream.status).end(); return; }
    const ct = upstream.headers.get("content-type") ?? "image/jpeg";
    res.setHeader("content-type", ct);
    res.setHeader("cache-control", "public, max-age=86400, immutable");
    const buf = Buffer.from(await upstream.arrayBuffer());
    res.send(buf);
  } catch (e) { next(e); }
}
