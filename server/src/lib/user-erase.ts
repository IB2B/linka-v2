import { softDeleteUser } from "./user-soft-delete";
import { purgeUser } from "./user-purge";

// Account deletion, for the user themselves or an admin. The soft delete locks
// the account and blanks the identity right away; the purge then erases the
// rest in the background. If it fails, the deleted-users sweeper retries.
export async function eraseUser(userId: string): Promise<void> {
  await softDeleteUser(userId);
  void purgeUser(userId).catch((e) => console.error("[user-purge]", userId, e));
}
