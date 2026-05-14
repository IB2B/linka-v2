import { db } from "../lib/db";
import { getAnthropic } from "../lib/anthropic";
import { buildPrompt, type ProfileRow, type NewsArticleInput } from "../lib/post-prompt";

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

async function loadProfile(userId: string): Promise<ProfileRow> {
  const [rows] = await db.query<ProfileRow[]>(
    `SELECT industry, job_title, voice_dna
     FROM user_profiles WHERE user_id = ? LIMIT 1`,
    [userId],
  );
  return (rows as ProfileRow[])[0] ?? { industry: null, job_title: null, voice_dna: null };
}

export async function generatePost(input: GenerateInput): Promise<GenerateResult> {
  const profile = await loadProfile(input.userId);
  const message = await getAnthropic().messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 800,
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
