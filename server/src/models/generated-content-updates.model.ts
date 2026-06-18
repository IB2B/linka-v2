import { db } from "../lib/db";

async function run(sql: string, params: unknown[]): Promise<boolean> {
  const [r] = await db.query<any>(sql, params);
  return (r as any).affectedRows > 0;
}

export function setSchedule(
  id: string, userId: string, scheduledFor: Date,
  platforms: string[], latePostId: string | null,
) {
  return run(
    `UPDATE generated_content
     SET status='scheduled', scheduled_for=?, scheduled_platforms=?,
         late_post_id=COALESCE(?, late_post_id)
     WHERE id=? AND user_id=?`,
    [scheduledFor, JSON.stringify(platforms), latePostId, id, userId],
  );
}

export function markPosted(id: string, userId: string, latePostId: string | null) {
  return run(
    `UPDATE generated_content SET status='posted', posted_at=NOW(3),
     late_post_id=? WHERE id=? AND user_id=?`, [latePostId, id, userId],
  );
}

export function setContent(id: string, userId: string, content: string) {
  return run(`UPDATE generated_content SET content=? WHERE id=? AND user_id=?`,
    [content, id, userId]);
}

export function setScore(
  id: string, userId: string,
  score: number, reasons: string[], suggestions: string[],
) {
  return run(
    `UPDATE generated_content
     SET virality_score=?, virality_reasons=?, virality_suggestions=?
     WHERE id=? AND user_id=?`,
    [score, JSON.stringify(reasons), JSON.stringify(suggestions), id, userId],
  );
}

export function deleteById(id: string, userId: string) {
  return run("DELETE FROM generated_content WHERE id=? AND user_id=?",
    [id, userId]);
}
