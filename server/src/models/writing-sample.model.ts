import { randomUUID } from "node:crypto";
import { db } from "../lib/db";
import type { WritingSample, SampleSource } from "../types/voice-lab";

const COLS = "id, user_id, title, content, source, word_count, processed_at, created_at";

function map(r: any): WritingSample {
  return {
    id: r.id, userId: r.user_id, title: r.title,
    content: r.content, source: r.source, wordCount: r.word_count,
    processedAt: r.processed_at ? new Date(r.processed_at).toISOString() : null,
    createdAt: new Date(r.created_at).toISOString(),
  };
}

export async function listByUser(userId: string): Promise<WritingSample[]> {
  const [rows] = await db.query<any[]>(
    `SELECT ${COLS} FROM writing_samples WHERE user_id = ? ORDER BY created_at DESC`,
    [userId],
  );
  return rows.map(map);
}

export async function countByUser(userId: string): Promise<number> {
  const [rows] = await db.query<any[]>(
    "SELECT COUNT(*) AS n FROM writing_samples WHERE user_id = ?", [userId],
  );
  return Number(rows[0]?.n ?? 0);
}

export async function getByIds(userId: string, ids: string[]): Promise<WritingSample[]> {
  if (!ids.length) return [];
  const placeholders = ids.map(() => "?").join(",");
  const [rows] = await db.query<any[]>(
    `SELECT ${COLS} FROM writing_samples WHERE user_id = ? AND id IN (${placeholders})`,
    [userId, ...ids],
  );
  return rows.map(map);
}

export async function insertOne(
  userId: string, title: string | null, content: string, source: SampleSource,
): Promise<WritingSample> {
  const id = randomUUID();
  const wordCount = content.trim().split(/\s+/).length;
  await db.query(
    "INSERT INTO writing_samples (id, user_id, title, content, source, word_count) VALUES (?,?,?,?,?,?)",
    [id, userId, title, content, source, wordCount],
  );
  const [rows] = await db.query<any[]>(`SELECT ${COLS} FROM writing_samples WHERE id = ?`, [id]);
  return map(rows[0]);
}

export async function deleteOne(userId: string, id: string): Promise<boolean> {
  const [r] = await db.query<any>(
    "DELETE FROM writing_samples WHERE id = ? AND user_id = ?", [id, userId],
  );
  return (r as any).affectedRows > 0;
}

export async function markProcessed(userId: string, ids: string[]): Promise<void> {
  if (!ids.length) return;
  const placeholders = ids.map(() => "?").join(",");
  await db.query(
    `UPDATE writing_samples SET processed_at = NOW(3) WHERE user_id = ? AND id IN (${placeholders})`,
    [userId, ...ids],
  );
}
