import { db } from "../lib/db";
import { getAnthropic } from "../lib/anthropic";
import { buildPrompt, POST_SYSTEM, type ProfileRow, type NewsArticleInput } from "../lib/post-prompt";
import { getForPlatform } from "../models/platform-instructions.model";
import { buildBrief } from "../lib/platform-brief";

export type GenerateInput = {
  userId: string;
  postType: string;
  topic?: string;
  newsArticle?: NewsArticleInput;
  platform?: string;
  language?: string;
};

export type GenerateResult = {
  content: string;
  model: string;
  tokensInput: number;
  tokensOutput: number;
};

async function loadProfile(userId: string, platform?: string): Promise<ProfileRow> {
  const [profileRes, instructions] = await Promise.all([
    db.query<any[]>(
      `SELECT industry, job_title, voice_dna
       FROM user_profiles WHERE user_id = ? LIMIT 1`,
      [userId],
    ),
    platform ? getForPlatform(userId, platform) : Promise.resolve(null),
  ]);
  const base = (profileRes[0] as ProfileRow[])[0]
    ?? { industry: null, job_title: null, voice_dna: null };
  return { ...base, brief: buildBrief(instructions) };
}

export async function generatePost(input: GenerateInput): Promise<GenerateResult> {
  const profile = await loadProfile(input.userId, input.platform);
  const message = await getAnthropic().messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1000,
    system: POST_SYSTEM,
    messages: [{ role: "user", content: buildPrompt(input, profile) }],
  });
  const block = message.content[0];
  if (block.type !== "text") throw new Error("No text returned by model");
  return {
    content: block.text.trim(),
    model: message.model,
    tokensInput: message.usage.input_tokens,
    tokensOutput: message.usage.output_tokens,
  };
}
