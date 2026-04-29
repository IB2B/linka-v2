import type { Response, NextFunction } from "express";
import { z } from "zod";
import type { AuthRequest } from "../middleware/auth";
import * as samples from "../models/writing-sample.model";
import * as service from "../services/voice-lab.service";

const sourceEnum = z.enum([
  "linkedin",
  "twitter",
  "facebook",
  "instagram",
  "threads",
  "newsletter",
  "blog",
  "article",
  "email",
  "other",
]);

const createSchema = z.object({
  title: z.string().trim().max(200).optional().nullable(),
  content: z.string().trim().min(100),
  source: sourceEnum.default("other"),
});

const bulkSchema = z.object({ samples: z.array(createSchema).min(1).max(20) });

function fail(res: Response, e: any, next: NextFunction): void {
  if (typeof e?.status === "number") { res.status(e.status).json({ error: e.message }); return; }
  next(e);
}

export async function listSamples(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const [list, limits] = await Promise.all([
      samples.listByUser(req.user!.id), service.getLimits(req.user!.id),
    ]);
    res.json({ samples: list, limits });
  } catch (e) { next(e); }
}

export async function createSample(req: AuthRequest, res: Response, next: NextFunction) {
  const parsed = createSchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.issues[0].message }); return; }
  try {
    const sample = await service.addSample(
      req.user!.id, parsed.data.title ?? null, parsed.data.content, parsed.data.source,
    );
    res.status(201).json(sample);
  } catch (e) { fail(res, e, next); }
}

export async function bulkCreateSamples(req: AuthRequest, res: Response, next: NextFunction) {
  const parsed = bulkSchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.issues[0].message }); return; }
  try {
    const created = [];
    for (const s of parsed.data.samples) {
      created.push(await service.addSample(req.user!.id, s.title ?? null, s.content, s.source));
    }
    res.status(201).json({ samples: created });
  } catch (e) { fail(res, e, next); }
}

export async function deleteSample(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const ok = await samples.deleteOne(req.user!.id, String(req.params.id));
    if (!ok) { res.status(404).json({ error: "Not found" }); return; }
    res.json({ ok: true });
  } catch (e) { next(e); }
}
