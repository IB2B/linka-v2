import { db } from "../lib/db";
import { getAnthropic } from "../lib/anthropic";
import { buildPrompt, POST_SYSTEM, type ProfileRow, type NewsArticleInput } from "../lib/post-prompt";
import { getForPlatform } from "../models/platform-instructions.model";
import { buildBrief } from "../lib/platform-brief";
import { sanitizePost } from "../lib/post-sanitize";
import { buildHashtags } from "../lib/hashtag-generate";
import { normalizeHashtags } from "../lib/hashtag-normalize";

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
  const platform = input.platform ?? "linkedin";
  return {
    content: await withTags(sanitizePost(block.text, platform), platform),
    model: message.model,
    tokensInput: message.usage.input_tokens,
    tokensOutput: message.usage.output_tokens,
  };
}

// Tags are chosen by a pass that reads the finished post and does nothing else.
// Picked at the tail of a 220-word generation they came out as whatever rhymed
// with the last paragraph; given the whole post to read, they land on its subject.
// sanitizePost has already removed anything the writing model added, so the tag
// step is the only author. Failure costs the tags, never the post.
async function withTags(body: string, platform: string): Promise<string> {
  const tags = await buildHashtags(body, platform).catch((err) => {
    console.error(`[hashtags] failed for ${platform}:`, err);
    return [] as string[];
  });
  if (!tags.length) return body;
  return normalizeHashtags(`${body}\n\n${tags.join(" ")}`, platform);
}
