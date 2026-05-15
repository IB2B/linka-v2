import dns from "node:dns/promises";
import net from "node:net";

export const MAX_PROXY_BYTES = 10 * 1024 * 1024;

function isPrivateV4(ip: string): boolean {
  const p = ip.split(".").map(Number);
  if (p.length !== 4 || p.some((n) => !Number.isFinite(n))) return true;
  const [a, b] = p;
  if (a === 0 || a === 10 || a === 127) return true;
  if (a === 169 && b === 254) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 192 && b === 168) return true;
  if (a === 100 && b >= 64 && b <= 127) return true;
  if (a >= 224) return true;
  return false;
}

function isPrivateV6(ip: string): boolean {
  const s = ip.toLowerCase();
  if (s === "::1" || s === "::") return true;
  if (s.startsWith("fe80:") || s.startsWith("fc") || s.startsWith("fd")) return true;
  if (s.startsWith("::ffff:")) return isPrivateV4(s.slice(7));
  return false;
}

export function isPrivateIp(ip: string): boolean {
  if (net.isIPv4(ip)) return isPrivateV4(ip);
  if (net.isIPv6(ip)) return isPrivateV6(ip);
  return true;
}

export async function hostnameIsPublic(host: string): Promise<boolean> {
  try {
    const records = await dns.lookup(host, { all: true });
    return records.length > 0 && records.every((r) => !isPrivateIp(r.address));
  } catch { return false; }
}

export async function readBoundedBody(body: ReadableStream<Uint8Array> | null, contentLength: number): Promise<Buffer> {
  if (contentLength > MAX_PROXY_BYTES) throw new Error("Image too large");
  const reader = body?.getReader();
  if (!reader) return Buffer.alloc(0);
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_PROXY_BYTES) { try { await reader.cancel(); } catch {} throw new Error("Image too large"); }
    chunks.push(value);
  }
  return Buffer.concat(chunks);
}
