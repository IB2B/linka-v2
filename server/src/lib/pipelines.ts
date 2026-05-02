import { z } from "zod";

import { db } from "./db";

const PLATFORMS = ["linkedin", "x", "instagram", "threads", "facebook", "tiktok"] as const;

export const createOppSchema = z.object({
  title: z.string().trim().min(1).max(255),
  stageId: z.string().uuid(),
  contactName: z.string().trim().max(160).optional().nullable(),
  contactHandle: z.string().trim().max(160).optional().nullable(),
  sourcePlatform: z.enum(PLATFORMS).optional().nullable(),
  notes: z.string().trim().max(5000).optional().nullable(),
});

export const updateOppSchema = z.object({
  title: z.string().trim().min(1).max(255).optional(),
  contactName: z.string().trim().max(160).nullable().optional(),
  contactHandle: z.string().trim().max(160).nullable().optional(),
  sourcePlatform: z.enum(PLATFORMS).nullable().optional(),
  notes: z.string().trim().max(5000).nullable().optional(),
});

export const moveOppSchema = z.object({
  stageId: z.string().uuid(),
  position: z.number().int().min(0),
});

export function mapStage(r: any) {
  return { id: r.id, name: r.name, position: r.position, outcome: r.outcome };
}

export function mapOpp(r: any) {
  return {
    id: r.id, pipelineId: r.pipeline_id, stageId: r.stage_id,
    title: r.title,
    contactName: r.contact_name, contactHandle: r.contact_handle,
    sourcePlatform: r.source_platform,
    status: r.status, notes: r.notes,
    conversationId: r.conversation_id,
    position: r.position,
    lastActivityAt: r.last_activity_at,
    createdAt: r.created_at, updatedAt: r.updated_at,
  };
}

const COL_MAP: Record<string, string> = {
  title: "title",
  contactName: "contact_name",
  contactHandle: "contact_handle",
  sourcePlatform: "source_platform",
  notes: "notes",
};

export function toUpdateColumn(key: string): string | null {
  return COL_MAP[key] ?? null;
}

export async function loadStage(stageId: string, userId: string) {
  const [rows] = await db.query<any[]>(
    `SELECT s.id, s.pipeline_id, s.outcome FROM pipeline_stages s
     JOIN pipelines p ON p.id = s.pipeline_id
     WHERE s.id = ? AND p.user_id = ?`,
    [stageId, userId],
  );
  return rows[0] ?? null;
}
