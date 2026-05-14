import { POST_TYPE_GUIDANCE } from "./post-type-guidance";
import { PLATFORM_HINT } from "./platform-hints";

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
