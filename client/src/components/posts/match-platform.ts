import type { Platform } from "@/lib/zernio/zernio-account.types";

// The provider stores accounts under the slug Zernio reports, which is "twitter"
// for some accounts and "x" for others. A post generated for one must still match
// an account connected as the other.
const ALIASES: Record<string, string[]> = {
  twitter: ["twitter", "x"],
  x: ["x", "twitter"],
};

export function matchConnected(
  postPlatform: string | null, connected: Platform[],
): Platform | null {
  if (!postPlatform) return null;
  const wanted = ALIASES[postPlatform] ?? [postPlatform];
  return connected.find((c) => wanted.includes(c)) ?? null;
}

// What starts out armed on a post.
//
// A post written for a platform arms that platform and nothing else. If it is not
// connected, nothing is armed — substituting another platform is how LinkedIn copy
// gets queued for Facebook, and one click is all it takes.
//
// No platform at all (the composer, or an old row) is a different case: there is
// nothing to contradict, so the first connected account is a fair default.
export function initialSelection(
  postPlatform: string | null, connected: Platform[],
): Platform[] {
  if (!postPlatform) return connected[0] ? [connected[0]] : [];
  const own = matchConnected(postPlatform, connected);
  return own ? [own] : [];
}
