import { z } from "zod";

import { db } from "./db";

const OUTCOME = ["open", "won", "lost"] as const;

export const createStageSchema = z.object({
  name: z.string().trim().min(1).max(80),
  outcome: z.enum(OUTCOME).optional(),
});

export const updateStageSchema = z.object({
  name: z.string().trim().min(1).max(80).optional(),
  outcome: z.enum(OUTCOME).optional(),
});

export async function loadDefaultPipeline(userId: string) {
  const [rows] = await db.query<any[]>(
    `SELECT id FROM pipelines
     WHERE user_id = ?
     ORDER BY is_default DESC, created_at ASC LIMIT 1`,
    [userId],
  );
  return rows[0] ?? null;
}

export async function loadOwnedStage(stageId: string, userId: string) {
  const [rows] = await db.query<any[]>(
    `SELECT s.id, s.pipeline_id FROM pipeline_stages s
     JOIN pipelines p ON p.id = s.pipeline_id
     WHERE s.id = ? AND p.user_id = ?`,
    [stageId, userId],
  );
  return rows[0] ?? null;
}
