import { db } from "../lib/db";
import * as samples from "../models/writing-sample.model";
import * as profile from "../models/voice-profile.model";
import { analyzeVoice } from "../lib/voice-analysis";
import { SAMPLE_LIMITS, type SampleSource, type WritingSample } from "../types/voice-lab";

function fail(status: number, message: string): never {
  throw Object.assign(new Error(message), { status });
}

export async function getLimits(userId: string): Promise<{
  current: number; limit: number; canAddMore: boolean;
}> {
  const [rows] = await db.query<any[]>(
    "SELECT plan_tier FROM subscriptions WHERE user_id = ?", [userId],
  );
  const tier = String(rows[0]?.plan_tier ?? "free").toLowerCase();
  const limit = SAMPLE_LIMITS[tier] ?? SAMPLE_LIMITS.free;
  const current = await samples.countByUser(userId);
  return { current, limit, canAddMore: current < limit };
}

export async function addSample(
  userId: string, title: string | null, content: string, source: SampleSource,
): Promise<WritingSample> {
  if (content.trim().length < 100) fail(400, "Sample is too short (min 100 chars).");
  const limits = await getLimits(userId);
  if (!limits.canAddMore) fail(403, `Sample limit reached (${limits.limit}). Upgrade to add more.`);
  return samples.insertOne(userId, title, content, source);
}

export async function runAnalysis(
  userId: string, sampleIds?: string[],
): Promise<{ version: number; sampleCount: number }> {
  const list = sampleIds?.length
    ? await samples.getByIds(userId, sampleIds)
    : await samples.listByUser(userId);
  if (list.length < 2) fail(400, "Need at least 2 samples to analyze.");
  const dna = await analyzeVoice(list);
  const { version } = await profile.saveVoiceDna(userId, dna, list.length);
  await samples.markProcessed(userId, list.map((s) => s.id));
  return { version, sampleCount: list.length };
}
