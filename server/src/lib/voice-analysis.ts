import { getAnthropic } from "./anthropic";
import type { VoiceDna, WritingSample } from "../types/voice-lab";

const SYSTEM = `You analyze a person's writing samples to extract their authentic voice profile for social-media content generation. Return ONLY valid JSON (no prose, no markdown fences) matching:
{
  "summary": string,
  "tone": { "primary": string, "secondary": string },
  "expertiseAreas": string[],
  "contentPillars": string[],
  "vocabulary": { "distinctive": string[], "avoided": string[] },
  "audience": string,
  "strengths": string[]
}`;

function buildPrompt(samples: WritingSample[]): string {
  return samples
    .map((s, i) => `--- Sample ${i + 1} (${s.source}${s.title ? `: ${s.title}` : ""}) ---\n${s.content}`)
    .join("\n\n");
}

export async function analyzeVoice(samples: WritingSample[]): Promise<VoiceDna> {
  const anthropic = getAnthropic();
  const msg = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 2000,
    system: SYSTEM,
    messages: [{ role: "user", content: buildPrompt(samples) }],
  });
  const text = msg.content
    .map((b) => (b.type === "text" ? b.text : ""))
    .join("");
  const cleaned = text.replace(/^```(?:json)?\s*|\s*```$/g, "").trim();
  return JSON.parse(cleaned) as VoiceDna;
}
