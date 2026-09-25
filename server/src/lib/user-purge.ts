import { db } from "./db";
import { collectUserFiles } from "./user-files";
import { deleteUpload } from "./upload-delete";
import { purgeUserExternal } from "./user-external-purge";

const DAY_MS = 24 * 60 * 60 * 1000;
// GDPR allows one month. Past this age the account is erased even if a provider
// keeps failing, and what was left behind is logged for manual cleanup.
const FORCE_AFTER_MS = 25 * DAY_MS;

async function deleteRows(userId: string): Promise<void> {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    // opportunities → pipeline_stages is ON DELETE RESTRICT, so the cascade from
    // users could hit a stage that still has cards. Clear the cards first.
    await conn.query("DELETE FROM opportunities WHERE user_id = ?", [userId]);
    // feedback only SET NULLs on user delete, but the message can identify them.
    await conn.query("DELETE FROM feedback WHERE user_id = ?", [userId]);
    // Every other user table cascades from this row.
    await conn.query("DELETE FROM users WHERE id = ? AND deleted_at IS NOT NULL", [userId]);
    await conn.commit();
  } catch (e) {
    await conn.rollback();
    throw e;
  } finally {
    conn.release();
  }
}

// Permanently erases an account that was already soft-deleted: data held by
// providers, uploaded files, then every database row. Safe to run twice.
export async function purgeUser(userId: string): Promise<void> {
  const [[u]] = await db.query<any[]>(
    "SELECT late_profile_id, deleted_at FROM users WHERE id = ? AND deleted_at IS NOT NULL",
    [userId],
  );
  if (!u) return;

  try {
    await purgeUserExternal(userId, u.late_profile_id ?? null);
  } catch (e) {
    if (Date.now() - new Date(u.deleted_at).getTime() < FORCE_AFTER_MS) throw e;
    console.error("[user-purge] forced erase, provider data may remain", {
      userId, lateProfileId: u.late_profile_id, error: (e as Error).message,
    });
  }

  const files = await collectUserFiles(userId);
  await Promise.all(files.map(deleteUpload));
  await deleteRows(userId);
}
