import { randomUUID } from "node:crypto";
import { db } from "../lib/db";
import type { GeneratedPost } from "../types/post";
import { POST_COLS, type PostRow, rowToPost } from "./generated-content-row";

export {
  setSchedule, markPosted, setContent, setScore, deleteById,
} from "./generated-content-updates.model";

type InsertInput = {
  userId: string; prompt: string | null; content: string;
  platform: string | null; imageUrl?: string | null;
  imageStatus?: "pending" | "skipped" | "completed";
  videoStatus?: "pending" | "skipped" | "completed";
  tokensInput?: number | null; tokensOutput?: number | null;
  model?: string | null;
};

export async function insertOne(i: InsertInput): Promise<GeneratedPost> {
  const id = randomUUID();
  await db.query(
    `INSERT INTO generated_content
       (id, user_id, prompt, content, tokens_input, tokens_output,
        model, platform, image_url, image_status, video_status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, i.userId, i.prompt, i.content,
     i.tokensInput ?? null, i.tokensOutput ?? null, i.model ?? null,
     i.platform, i.imageUrl ?? null, i.imageStatus ?? "skipped",
     i.videoStatus ?? "skipped"],
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
