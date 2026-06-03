import { POST_TYPE_GUIDANCE } from "./post-type-guidance";
import { PLATFORM_HINT } from "./platform-hints";

// Default writing voice used for every post (the user's trained Voice Lab
// guidance, when present, layers on top of this in the user message).
export const POST_SYSTEM = `You are an expert social-media ghostwriter. Write posts that feel written by a real person and native to the platform — never generic or AI-sounding.

Always:
- Lead with a strong first line that stops the scroll, on its own line.
- Keep paragraphs short (1-3 lines) with a blank line between them, so it's easy to read on mobile.
- Be concrete and specific: real details, a small story, or a sharp insight. No clichés, no buzzword soup, no "I'm thrilled/excited to announce".
- Natural first-person voice, varied sentence length. Plain text only — no markdown.
- Close with one genuine question or a takeaway worth reflecting on.

Follow the platform format, length, and any voice, tone, or audience guidance given in the prompt.`;

export type ProfileRow = {
  industry: string | null;
  job_title: string | null;
  voice_dna: any;
};

export type NewsArticleInput = {
  title: string;
  url?: string;
  source?: string;
  summary?: string;
};

export type PromptInput = {
  postType: string;
  topic?: string;
  newsArticle?: NewsArticleInput;
  platform?: string;
  language?: string;
};

function voiceLine(voiceDna: any): string {
  if (!voiceDna) return "";
  const tone = voiceDna.tone?.primary ? `Tone: ${voiceDna.tone.primary}.` : "";
  const audience = voiceDna.audience ? `Audience: ${voiceDna.audience}.` : "";
  const summary = voiceDna.summary ? `Voice: ${voiceDna.summary}` : "";
  return [summary, tone, audience].filter(Boolean).join(" ");
}

export function buildPrompt(input: PromptInput, profile: ProfileRow): string {
  const guidance = POST_TYPE_GUIDANCE[input.postType] ?? "professional content";
  const role = `${profile.job_title ?? "professional"} in ${profile.industry ?? "tech"}`;
  const voice = voiceLine(profile.voice_dna);
  const platform = input.platform ?? "linkedin";
  const platformHint = PLATFORM_HINT[platform] ?? PLATFORM_HINT.linkedin;
  const lang = input.language && input.language !== "en"
    ? `Write the post in language code "${input.language}". `
    : "";
  const article = input.newsArticle
    ? `\nArticle: "${input.newsArticle.title}"${input.newsArticle.summary ? ` — ${input.newsArticle.summary}` : ""}${input.newsArticle.source ? ` (${input.newsArticle.source})` : ""}.`
    : "";
  const subject = input.topic
    ? `Topic: ${input.topic}.`
    : `Pick a sharp angle from: ${guidance}.`;
  return `Write a single ${platform} post for a ${role}.
Style: ${input.postType.replace(/_/g, " ")}. ${subject}${article}
${voice}

${lang}Format: ${platformHint} Plain text only — never use markdown syntax (no **, *, _, #, >, \`, or [text](url)). Open with a hook line. End with a question or call to reflect.`;
}
