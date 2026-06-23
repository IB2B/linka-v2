import type { RowDataPacket } from "mysql2";
import { db } from "./db";

interface UserRow extends RowDataPacket { user_id: string }

// Distinct users with a scheduled post whose time has arrived and that still
// needs syncing against Late — i.e. the scheduled → posted/failed flip hasn't
// been observed yet. Once a post flips it leaves `status='scheduled'` and the
// user drops out of this set, so the poller self-limits.
export async function findUsersWithDuePosts(): Promise<string[]> {
  const [rows] = await db.query<UserRow[]>(
    `SELECT DISTINCT user_id FROM generated_content
     WHERE status = 'scheduled' AND late_post_id IS NOT NULL
       AND (scheduled_for IS NULL OR scheduled_for <= NOW())`,
  );
  return rows.map((r) => r.user_id);
}
