import https from "node:https";
import type { PinnedHost } from "./image-proxy-guards";

export type PinnedResponse = {
  status: number;
  contentType: string;
  contentLength: number;
  body: Buffer;
};

const MAX_BYTES = 10 * 1024 * 1024;
const TIMEOUT_MS = 10_000;

export function fetchPinned(
  url: URL, pinned: PinnedHost, userAgent: string,
): Promise<PinnedResponse> {
  return new Promise((resolve, reject) => {
    const req = https.request({
      host: pinned.ip,
      family: pinned.family,
      port: 443,
      path: `${url.pathname}${url.search}`,
      method: "GET",
      servername: url.hostname,
      timeout: TIMEOUT_MS,
      headers: { host: url.hostname, "User-Agent": userAgent, accept: "image/*" },
    }, (res) => {
      const status = res.statusCode ?? 0;
      if (status >= 300 && status < 400) {
        res.resume(); reject(new Error("Redirect rejected")); return;
      }
      const contentType = String(res.headers["content-type"] ?? "").split(";")[0]!.trim();
      const contentLength = Number(res.headers["content-length"] ?? 0);
      if (contentLength > MAX_BYTES) {
        res.resume(); reject(new Error("Image too large")); return;
      }
      const chunks: Buffer[] = [];
      let size = 0;
      res.on("data", (c: Buffer) => {
        size += c.length;
        if (size > MAX_BYTES) { req.destroy(new Error("Image too large")); return; }
        chunks.push(c);
      });
      res.on("end", () => resolve({ status, contentType, contentLength, body: Buffer.concat(chunks) }));
      res.on("error", reject);
    });
    req.on("timeout", () => req.destroy(new Error("Upstream timeout")));
    req.on("error", reject);
    req.end();
  });
}
