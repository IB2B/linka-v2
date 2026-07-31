import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth";
import { lateFetch } from "../lib/late-api";
import { lateAccountsUrl } from "../lib/late-accounts-url";
import { getOrCreateLateProfile } from "../lib/late-profile";
import { fetchPinterestAvatar } from "../lib/pinterest-avatar";
import { fetchRedditAvatar } from "../lib/reddit-avatar";

type RawAccount = {
  _id: string;
  platform: string;
  username?: string;
  displayName?: string;
  name?: string;
  profilePicture?: string | null;
  picture?: string | null;
  avatar?: string | null;
  imageUrl?: string | null;
  profilePicUrl?: string | null;
  profile?: { picture?: string | null; profilePicture?: string | null } | null;
  profileId?: string | { _id: string };
};

function profileIdOf(a: RawAccount): string | undefined {
  return typeof a.profileId === "string" ? a.profileId : a.profileId?._id;
}

function pickAvatar(a: RawAccount): string | null {
  return a.profilePicture || a.picture || a.avatar || a.imageUrl
    || a.profilePicUrl || a.profile?.picture || a.profile?.profilePicture
    || null;
}

function normalizeAvatarUrl(url: string | null): string | null {
  return url ? url.replace(/&amp;/g, "&") : null;
}

const UNAVATAR_DOMAIN: Record<string, string> = {
  twitter: "twitter", x: "twitter", instagram: "instagram",
  tiktok: "tiktok", youtube: "youtube", github: "github",
  substack: "substack", reddit: "reddit",
};

function fallbackAvatar(platform: string, username: string): string | null {
  const slug = UNAVATAR_DOMAIN[platform];
  if (!slug) return null;
  const handle = username.replace(/^@/, "").trim();
  if (!handle) return null;
  return `https://unavatar.io/${slug}/${encodeURIComponent(handle)}?fallback=false`;
}

async function buildAccounts(profileId: string) {
  const data = await lateFetch<{ accounts: RawAccount[] }>(
    lateAccountsUrl(profileId),
  );
  const filtered = (data.accounts ?? []).filter((a) => {
    const pid = profileIdOf(a);
    return !pid || pid === profileId;
  });
  return Promise.all(filtered.map(async (a) => {
    const username = a.username ?? a.displayName ?? a.name ?? "";
    let avatar = normalizeAvatarUrl(pickAvatar(a));
    if (!avatar && a.platform === "pinterest") avatar = await fetchPinterestAvatar(username);
    if (!avatar && a.platform === "reddit") avatar = await fetchRedditAvatar(username);
    if (!avatar) avatar = fallbackAvatar(a.platform, username);
    return { id: a._id, platform: a.platform, username, avatar_url: avatar };
  }));
}

export async function listAccounts(req: AuthRequest, res: Response) {
  try {
    const profileId = await getOrCreateLateProfile(req.user!.id);
    res.json({ accounts: await buildAccounts(profileId) });
  } catch (e) {
    // Late profile-limit / outage: show none rather than 500 the page.
    console.warn("[accounts] Late unavailable:", e instanceof Error ? e.message : e);
    res.json({ accounts: [] });
  }
}
