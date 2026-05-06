import { randomUUID } from "node:crypto";
import { db } from "../lib/db";
import type { GeneratedPost } from "../types/post";
import { POST_COLS, type PostRow, rowToPost } from "./generated-content-row";

type InsertInput = {
  userId: string; prompt: string | null; content: string;
  platform: string | null; imageUrl?: string | null;
  imageStatus?: "pending" | "skipped";
};

export async function insertOne(i: InsertInput): Promise<GeneratedPost> {
  const id = randomUUID();
  await db.query(
    `INSERT INTO generated_content
       (id, user_id, prompt, content, platform, image_url, image_status)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [id, i.userId, i.prompt, i.content, i.platform,
     i.imageUrl ?? null, i.imageStatus ?? "skipped"],
  );
  const post = await findById(id, i.userId);
  if (!post) throw new Error("Insert failed");
  return post;
}

export async function listForUser(userId: string): Promise<GeneratedPost[]> {
  const [rows] = await db.query<PostRow[]>(
    `SELECT ${POST_COLS} FROM generated_content
     WHERE user_id = ? ORDER BY created_at DESC LIMIT 100`,
    [userId],
  );
  return (rows as PostRow[]).map(rowToPost);
}

export async function findById(
  id: string, userId: string,
): Promise<GeneratedPost | null> {
  const [rows] = await db.query<PostRow[]>(
    `SELECT ${POST_COLS} FROM generated_content WHERE id = ? AND user_id = ? LIMIT 1`,
    [id, userId],
  );
  const row = (rows as PostRow[])[0];
  return row ? rowToPost(row) : null;
}

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

export function deleteById(id: string, userId: string) {
  return run("DELETE FROM generated_content WHERE id=? AND user_id=?",
    [id, userId]);
}
