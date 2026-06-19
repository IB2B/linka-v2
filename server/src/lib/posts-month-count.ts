import { db } from "./db";

// Posts created in the current calendar month — the monthly plan quota.
// Single source of truth so the sidebar meter, usage card and billing page
// never disagree on "posts used".
export async function countPostsThisMonth(userId: string): Promise<number> {
  const [rows] = await db.query<any[]>(
    `SELECT COUNT(*) AS n FROM generated_content
       WHERE user_id = ?
         AND created_at >= DATE_FORMAT(NOW(), '%Y-%m-01 00:00:00')`,
    [userId],
  );
  return Number(rows[0]?.n ?? 0);
}
