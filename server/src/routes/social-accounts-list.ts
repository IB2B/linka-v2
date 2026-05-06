import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth";
import { lateFetch } from "../lib/late-api";
import { getOrCreateLateProfile } from "../lib/late-profile";

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

export async function listAccounts(req: AuthRequest, res: Response) {
  const profileId = await getOrCreateLateProfile(req.user!.id);
  const data = await lateFetch<{ accounts: RawAccount[] }>(
    `/accounts?profileId=${encodeURIComponent(profileId)}&limit=100`,
  );
  const filtered = (data.accounts ?? []).filter((a) => {
    const pid = profileIdOf(a);
    return !pid || pid === profileId;
  });
  console.log("[social/accounts] raw\n", JSON.stringify(filtered, null, 2));
  res.json({
    accounts: filtered.map((a) => ({
      id: a._id,
      platform: a.platform,
      username: a.username ?? a.displayName ?? a.name ?? "",
      avatar_url: pickAvatar(a),
    })),
  });
}
