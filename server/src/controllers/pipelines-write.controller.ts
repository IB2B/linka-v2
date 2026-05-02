import type { Response } from "express";
import { randomUUID } from "node:crypto";
import { z } from "zod";

import { db } from "../lib/db";
import type { AuthRequest } from "../middleware/auth";

const stageSchema = z.object({
  name: z.string().trim().min(1).max(80),
  outcome: z.enum(["open", "won", "lost"]).optional(),
});

const createPipelineSchema = z.object({
  name: z.string().trim().min(1).max(120),
  stages: z.array(stageSchema).max(20).optional(),
});

export async function createPipeline(req: AuthRequest, res: Response) {
  const parsed = createPipelineSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0].message });
    return;
  }
  const id = randomUUID();
  await db.query(
    `INSERT INTO pipelines (id, user_id, name, is_default) VALUES (?, ?, ?, FALSE)`,
    [id, req.user!.id, parsed.data.name],
  );
  const stages = parsed.data.stages ?? [];
  for (let i = 0; i < stages.length; i++) {
    const s = stages[i];
    await db.query(
      `INSERT INTO pipeline_stages (id, pipeline_id, name, position, outcome) VALUES (?, ?, ?, ?, ?)`,
      [randomUUID(), id, s.name, i, s.outcome ?? "open"],
    );
  }
  res.status(201).json({ id });
}
