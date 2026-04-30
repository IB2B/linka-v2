import { lateFetch } from "./late-api";
import { getOrCreateLateProfile } from "./late-profile";

type RawAccount = {
  _id: string;
  platform: string;
  profileId?: string | { _id: string };
};

export type PlatformEntry = { platform: string; accountId: string };

function ownerProfileId(a: RawAccount): string | undefined {
  return typeof a.profileId === "string" ? a.profileId : a.profileId?._id;
}

export async function resolvePlatformAccounts(
  userId: string, platforms: string[],
): Promise<PlatformEntry[]> {
  const profileId = await getOrCreateLateProfile(userId);
  const data = await lateFetch<{ accounts: RawAccount[] }>(
    `/accounts?profileId=${encodeURIComponent(profileId)}&limit=100`,
  );
  const owned = (data.accounts ?? []).filter((a) => {
    const pid = ownerProfileId(a);
    return !pid || pid === profileId;
  });
  const wanted = platforms.length ? platforms : owned.map((a) => a.platform);
  return wanted
    .map((p) => {
      const acc = owned.find((a) => a.platform === p);
      return acc ? { platform: p, accountId: acc._id } : null;
    })
    .filter((x): x is PlatformEntry => x !== null);
}
