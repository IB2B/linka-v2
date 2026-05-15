import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth";
import { lateFetch } from "../lib/late-api";
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

const UNAVATAR_DOMAIN: Record<string, string> = {
  twitter: "twitter", x: "twitter", instagram: "instagram",
  tiktok: "tiktok", youtube: "youtube", github: "github",
  substack: "substack",
};

function fallbackAvatar(platform: string, username: string): string | null {
  const slug = UNAVATAR_DOMAIN[platform];
  if (!slug) return null;
  const handle = username.replace(/^@/, "").trim();
  if (!handle) return null;
  return `https://unavatar.io/${slug}/${encodeURIComponent(handle)}?fallback=false`;
}

export async function listAccounts(req: AuthRequest, res: Response) {
  const profileId = await getOrCreateLateProfile(req.user!.id);
  const data = await lateFetch<{ accounts: RawAccount[] }>(
    `/accounts?profileId=${encodeURIComponent(profileId)}&limit=100`,
  );
  const filtered = (data.accounts ?? []).filter((a) => {
    const pid = profileIdOf(a);
    return !pid || pid === profileId;
  });
  const accounts = await Promise.all(filtered.map(async (a) => {
    const username = a.username ?? a.displayName ?? a.name ?? "";
    let avatar = pickAvatar(a) ?? fallbackAvatar(a.platform, username);
    if (!avatar && a.platform === "pinterest") {
      avatar = await fetchPinterestAvatar(username);
    }
    if (!avatar && a.platform === "reddit") {
      avatar = await fetchRedditAvatar(username);
    }
    return { id: a._id, platform: a.platform, username, avatar_url: avatar };
  }));
  res.json({ accounts });
}
