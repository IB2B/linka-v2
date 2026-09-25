import { purgeLateData } from "./purge-late";
import { purgeHeygenAvatars } from "./purge-heygen";
import { deleteLinkedinAccount } from "./unipile-account";

// Erases what third-party processors hold for the user. Runs before the DB
// rows go, because those rows are the only record of the provider ids. All
// three run even if one fails; the first error is rethrown so the purge retries.
export async function purgeUserExternal(
  userId: string, lateProfileId: string | null,
): Promise<void> {
  const results = await Promise.allSettled([
    purgeLateData(userId, lateProfileId),
    purgeHeygenAvatars(userId),
    deleteLinkedinAccount(userId),
  ]);
  const failed = results.find((r) => r.status === "rejected");
  if (failed) throw (failed as PromiseRejectedResult).reason;
}
