import { lateFetch } from "./late-api";
import { getOrCreateLateProfile } from "./late-profile";

type RawAccount = {
  _id: string;
  platform: string;
  profileId?: string | { _id: string };
  username?: string;
  displayName?: string;
  name?: string;
  platformUserId?: string;
  platformId?: string;
  externalId?: string;
};

export type PlatformEntry = {
  platform: string;
  accountId: string;
  ownerId: string | null;
  ownerUsername: string | null;
  ownerName: string | null;
};

function ownerProfileId(a: RawAccount): string | undefined {
  return typeof a.profileId === "string" ? a.profileId : a.profileId?._id;
}

function toEntry(a: RawAccount): PlatformEntry {
  return {
    platform: a.platform,
    accountId: a._id,
    ownerId: a.platformUserId ?? a.platformId ?? a.externalId ?? null,
    ownerUsername: a.username ?? null,
    ownerName: a.displayName ?? a.name ?? null,
  };
}

const ALIASES: Record<string, string[]> = {
  twitter: ["twitter", "x"],
  x: ["x", "twitter"],
};

function matches(accountPlatform: string, wanted: string): boolean {
  const variants = ALIASES[wanted] ?? [wanted];
  return variants.includes(accountPlatform);
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
  console.log(
    "\n=== [late.accounts] raw ===\n",
    JSON.stringify(owned, null, 2), "\n=========================",
  );
  const wanted = platforms.length ? platforms : owned.map((a) => a.platform);
  return wanted
    .map((p) => owned.find((a) => matches(a.platform, p)))
    .filter((a): a is RawAccount => !!a)
    .map(toEntry);
}
