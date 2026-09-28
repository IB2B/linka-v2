import { db } from "./db";

// Monthly video quota, stored in video_usage so it survives restarts and
// deploys. A render claims its row when it starts (so parallel renders can't
// overshoot the cap) and gives it back if it fails.
export async function countVideosThisMonth(userId: string): Promise<number> {
  const [rows] = await db.query<any[]>(
    `SELECT COUNT(*) AS n FROM video_usage
       WHERE user_id = ?
         AND created_at >= DATE_FORMAT(NOW(), '%Y-%m-01 00:00:00')`,
    [userId],
  );
  return Number(rows[0]?.n ?? 0);
}

export async function claimVideo(userId: string, contentId: string): Promise<void> {
  await db.query(
    `INSERT INTO video_usage (user_id, content_id) VALUES (?, ?)`,
    [userId, contentId],
  );
}

// Drops the newest claim for this post, so an earlier successful render of
// the same post still counts.
export async function refundVideo(userId: string, contentId: string): Promise<void> {
  await db.query(
    `DELETE FROM video_usage WHERE user_id = ? AND content_id = ?
       ORDER BY id DESC LIMIT 1`,
    [userId, contentId],
  );
}
