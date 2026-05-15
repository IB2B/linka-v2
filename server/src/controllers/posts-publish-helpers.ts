import type { Response } from "express";
import { resolvePlatformAccounts, type PlatformEntry } from "../lib/late-accounts";

export async function resolveOrFail(
  userId: string, platforms: string[], res: Response,
): Promise<PlatformEntry[] | null> {
  const entries = await resolvePlatformAccounts(userId, platforms);
  if (entries.length === 0) {
    res.status(400).json({ error: "No connected accounts for the selected platforms." });
    return null;
  }
  return entries;
}
