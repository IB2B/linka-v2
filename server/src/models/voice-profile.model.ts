import { randomUUID } from "node:crypto";
import { db } from "../lib/db";
import type { VoiceProfile, VoiceDna } from "../types/voice-lab";

function parseDna(raw: unknown): VoiceDna | null {
  if (!raw) return null;
  return typeof raw === "string" ? (JSON.parse(raw) as VoiceDna) : (raw as VoiceDna);
}

export async function get(userId: string): Promise<VoiceProfile> {
  const [rows] = await db.query<any[]>(
    `SELECT industry, job_title, target_audience, voice_dna,
            voice_profile_version, voice_profile_updated_at
     FROM user_profiles WHERE user_id = ?`, [userId],
  );
  const r = rows[0];
  if (!r) {
    return { industry: null, jobTitle: null, targetAudience: null,
             voiceDna: null, version: 0, updatedAt: null };
  }
  return {
    industry: r.industry, jobTitle: r.job_title, targetAudience: r.target_audience,
    voiceDna: parseDna(r.voice_dna),
    version: r.voice_profile_version,
    updatedAt: r.voice_profile_updated_at ? new Date(r.voice_profile_updated_at).toISOString() : null,
  };
}

export async function saveVoiceDna(
  userId: string, dna: VoiceDna, sampleCount: number,
): Promise<{ version: number }> {
  const [existing] = await db.query<any[]>(
    "SELECT voice_profile_version FROM user_profiles WHERE user_id = ?", [userId],
  );
  const nextVersion = ((existing[0]?.voice_profile_version as number) ?? 0) + 1;
  const json = JSON.stringify(dna);

  if (existing[0]) {
    await db.query(
      `UPDATE user_profiles SET voice_dna = ?, voice_profile_version = ?,
              voice_profile_updated_at = NOW(3) WHERE user_id = ?`,
      [json, nextVersion, userId],
    );
  } else {
    await db.query(
      `INSERT INTO user_profiles (id, user_id, voice_dna, voice_profile_version, voice_profile_updated_at)
       VALUES (?, ?, ?, ?, NOW(3))`,
      [randomUUID(), userId, json, nextVersion],
    );
  }
  await db.query(
    `INSERT INTO voice_profile_versions (id, user_id, version, voice_dna, sample_count)
     VALUES (?, ?, ?, ?, ?)`,
    [randomUUID(), userId, nextVersion, json, sampleCount],
  );
  return { version: nextVersion };
}
