import Anthropic from "@anthropic-ai/sdk";

let client: Anthropic | null = null;

export function getAnthropic(): Anthropic {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    const err = Object.assign(
      new Error("Voice analysis is unavailable (ANTHROPIC_API_KEY not set)."),
      { status: 503 },
    );
    throw err;
  }
  if (!client) client = new Anthropic({ apiKey: key });
  return client;
}
