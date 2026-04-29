import { randomUUID } from "node:crypto";
import { db } from "../lib/db";
import type { GeneratedPost } from "../types/post";
import { POST_COLS, type PostRow, rowToPost } from "./generated-content-row";

export async function insertOne(input: {
  userId: string;
  prompt: string | null;
  content: string;
  platform: string | null;
  imageUrl?: string | null;
  imageStatus?: "pending" | "skipped";
}): Promise<GeneratedPost> {
  const id = randomUUID();
  await db.query(
    `INSERT INTO generated_content
       (id, user_id, prompt, content, platform, image_url, image_status)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [id, input.userId, input.prompt, input.content, input.platform,
     input.imageUrl ?? null, input.imageStatus ?? "skipped"],
  );
  const post = await findById(id, input.userId);
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

export async function setSchedule(
  id: string, userId: string, scheduledFor: Date,
): Promise<boolean> {
  const [r] = await db.query<any>(
    `UPDATE generated_content SET status = 'scheduled', scheduled_for = ?
     WHERE id = ? AND user_id = ?`,
    [scheduledFor, id, userId],
  );
  return (r as any).affectedRows > 0;
}

export async function markPosted(
  id: string, userId: string, latePostId: string | null,
): Promise<boolean> {
  const [r] = await db.query<any>(
    `UPDATE generated_content
     SET status = 'posted', posted_at = NOW(3), late_post_id = ?
     WHERE id = ? AND user_id = ?`,
    [latePostId, id, userId],
  );
  return (r as any).affectedRows > 0;
}

export async function deleteById(
  id: string, userId: string,
): Promise<boolean> {
  const [r] = await db.query<any>(
    "DELETE FROM generated_content WHERE id = ? AND user_id = ?",
    [id, userId],
  );
  return (r as any).affectedRows > 0;
}
