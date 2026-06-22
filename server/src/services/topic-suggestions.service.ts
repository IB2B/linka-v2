import { db } from "../lib/db";
import { getAnthropic } from "../lib/anthropic";
import { buildPrompt, parseTopics, dedupeAgainst } from "../lib/topic-suggestions-helpers";

type ProfileRow = {
  industry: string | null;
  job_title: string | null;
  preferred_language: string | null;
};
type TopicRow = { prompt: string | null };

export async function loadContext(userId: string) {
  const [[p], [t]] = await Promise.all([
    db.query<ProfileRow[]>(
      "SELECT industry, job_title, preferred_language FROM user_profiles WHERE user_id = ? LIMIT 1",
      [userId],
    ),
    db.query<TopicRow[]>(
      `SELECT prompt FROM generated_content
       WHERE user_id = ? AND prompt IS NOT NULL
       ORDER BY created_at DESC LIMIT 20`,
      [userId],
    ),
  ]);
  const profile = p[0] ?? { industry: null, job_title: null, preferred_language: null };
  const usedTopics = (t as TopicRow[]).map((r) => r.prompt!).filter(Boolean);
  return { profile, usedTopics };
}

export async function generateTopics(
  userId: string, postType: string, count: number, language?: string,
): Promise<string[]> {
  const { profile, usedTopics } = await loadContext(userId);
  const industry = profile.industry ?? "technology";
  const jobTitle = profile.job_title ?? "professional";
  const lang = language ?? profile.preferred_language ?? "en";
  const message = await getAnthropic().messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 300,
    messages: [
      { role: "user", content: buildPrompt(postType, count, jobTitle, industry, usedTopics, lang) },
    ],
  });
  const block = message.content[0];
  if (block.type !== "text") return [];
  try {
    return dedupeAgainst(parseTopics(block.text), usedTopics);
  } catch {
    return [];
  }
}
