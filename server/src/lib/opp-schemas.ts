import { z } from "zod";

const PLATFORMS = ["linkedin", "x", "instagram", "threads", "facebook", "tiktok"] as const;
const url = z
  .string()
  .trim()
  .url()
  .max(2048)
  .refine((s) => /^https?:\/\//i.test(s), "Must be an http(s) URL")
  .optional()
  .nullable();

export const createOppSchema = z.object({
  title: z.string().trim().min(1).max(255),
  stageId: z.string().uuid(),
  contactName: z.string().trim().max(160).optional().nullable(),
  contactHandle: z.string().trim().max(160).optional().nullable(),
  sourcePlatform: z.enum(PLATFORMS).optional().nullable(),
  notes: z.string().trim().max(5000).optional().nullable(),
  socialUrl: url,
  facebookUrl: url,
  instagramUrl: url,
  xUrl: url,
  tiktokUrl: url,
  threadsUrl: url,
});

export const updateOppSchema = z.object({
  title: z.string().trim().min(1).max(255).optional(),
  contactName: z.string().trim().max(160).nullable().optional(),
  contactHandle: z.string().trim().max(160).nullable().optional(),
  sourcePlatform: z.enum(PLATFORMS).nullable().optional(),
  notes: z.string().trim().max(5000).nullable().optional(),
  socialUrl: url,
  facebookUrl: url,
  instagramUrl: url,
  xUrl: url,
  tiktokUrl: url,
  threadsUrl: url,
});

export const moveOppSchema = z.object({
  stageId: z.string().uuid(),
  position: z.number().int().min(0),
});
