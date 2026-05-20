import dns from "node:dns/promises";
import net from "node:net";

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

export type PinnedHost = { ip: string; family: 4 | 6 };

export async function resolvePinnedHost(host: string): Promise<PinnedHost | null> {
  try {
    const records = await dns.lookup(host, { all: true });
    if (records.length === 0) return null;
    if (records.some((r) => isPrivateIp(r.address))) return null;
    const r = records[0]!;
    return { ip: r.address, family: r.family as 4 | 6 };
  } catch { return null; }
}
