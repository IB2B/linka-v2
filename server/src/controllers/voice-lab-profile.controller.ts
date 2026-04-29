import type { Response, NextFunction } from "express";
import { z } from "zod";
import type { AuthRequest } from "../middleware/auth";
import * as profile from "../models/voice-profile.model";
import * as service from "../services/voice-lab.service";

const analyzeSchema = z.object({ sampleIds: z.array(z.string().uuid()).optional() });

export async function getProfile(req: AuthRequest, res: Response, next: NextFunction) {
  try { res.json(await profile.get(req.user!.id)); } catch (e) { next(e); }
}

export async function analyze(req: AuthRequest, res: Response, next: NextFunction) {
  const parsed = analyzeSchema.safeParse(req.body ?? {});
  if (!parsed.success) { res.status(400).json({ error: parsed.error.issues[0].message }); return; }
  try {
    const result = await service.runAnalysis(req.user!.id, parsed.data.sampleIds);
    const fresh = await profile.get(req.user!.id);
    res.json({ ...result, profile: fresh });
  } catch (e: any) {
    if (typeof e?.status === "number") {
      res.status(e.status).json({ error: e.message }); return;
    }
    next(e);
  }
}
