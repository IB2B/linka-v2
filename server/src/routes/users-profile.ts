import { randomUUID } from "node:crypto";
import { z } from "zod";
import { db } from "../lib/db";
import type { AuthRequest } from "../middleware/auth";
import type { Response } from "express";

const schema = z.object({
  industry:      z.string().trim().optional(),
  bio:           z.string().trim().optional(),
  jobTitle:      z.string().trim().optional(),
  companyType:   z.string().trim().optional(),
  companySize:   z.string().trim().optional(),
  fundingAmount: z.string().trim().optional(),
});

export async function patchProfile(req: AuthRequest, res: Response): Promise<void> {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0].message });
    return;
  }
  const { industry, bio, jobTitle, companyType, companySize, fundingAmount } = parsed.data;
  await db.query(
    `INSERT INTO user_profiles (id, user_id, industry, bio, job_title, company_type, company_size, funding_amount)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE
       industry       = COALESCE(VALUES(industry), industry),
       bio            = COALESCE(VALUES(bio), bio),
       job_title      = COALESCE(VALUES(job_title), job_title),
       company_type   = COALESCE(VALUES(company_type), company_type),
       company_size   = COALESCE(VALUES(company_size), company_size),
       funding_amount = COALESCE(VALUES(funding_amount), funding_amount)`,
    [randomUUID(), req.user!.id,
     industry ?? null, bio ?? null, jobTitle ?? null,
     companyType ?? null, companySize ?? null, fundingAmount ?? null],
  );
  res.json({ ok: true });
}
