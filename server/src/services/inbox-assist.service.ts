import { db } from "../lib/db";
import { getAnthropic } from "../lib/anthropic";

export type Intent = "purchase" | "support" | "faq" | "spam" | "other";

export type AssistResult = {
  intent: Intent;
  confidence: number;
  summary: string;
  replies: { label: string; text: string }[];
  shouldAutoReply: boolean;
};

const SYSTEM = `You triage social media DMs. Classify intent, summarize the conversation, and draft 3 reply options.
Intents: purchase | support | faq | spam | other.
- purchase: clear buying signal (pricing, availability, "how do I order").
- support: complaint, bug, refund, problem with order.
- faq: simple recurring question (hours, location, policy).
- spam: bot, crypto, irrelevant pitch.
- other: real conversation, partnership, casual reply.

Match the user's voice tone. For spam set shouldAutoReply=false and replies=[].
Output ONLY raw JSON, no markdown, no code fences:
{"intent":string,"confidence":number 0-1,"summary":string,"replies":[{"label":"Formal","text":string},{"label":"Friendly","text":string},{"label":"Brief","text":string}],"shouldAutoReply":boolean}`;

type VoiceRow = { voice_dna: any };

async function loadVoice(userId: string): Promise<string> {
  const [rows] = await db.query<VoiceRow[]>(
    `SELECT voice_dna FROM user_profiles WHERE user_id = ? LIMIT 1`,
    [userId],
  );
  const v = (rows as VoiceRow[])[0]?.voice_dna;
  if (!v) return "neutral, friendly, concise";
  const tone = v.tone?.primary ?? "neutral";
  return v.summary ? `${v.summary} (Tone: ${tone}).` : `Tone: ${tone}.`;
}

function parseJson(text: string): AssistResult {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start < 0) { console.error("[assist] unparseable response:", text); throw new Error("Bad model response"); }
  const o = JSON.parse(text.slice(start, end + 1));
  const intent = (["purchase","support","faq","spam","other"].includes(o.intent)
    ? o.intent : "other") as Intent;
  const replies = Array.isArray(o.replies)
    ? o.replies.filter((r: any) => r.label && r.text)
    : [];
  return {
    intent,
    confidence: Math.max(0, Math.min(1, Number(o.confidence) || 0)),
    summary: typeof o.summary === "string" ? o.summary.trim() : "",
    replies,
    shouldAutoReply: Boolean(o.shouldAutoReply) && intent !== "spam",
  };
}

export async function assistReply(
  userId: string,
  thread: { direction: "incoming" | "outgoing"; text: string }[],
): Promise<AssistResult> {
  const voice = await loadVoice(userId);
  const transcript = thread.slice(-10).map((m) =>
    `${m.direction === "incoming" ? "Them" : "You"}: ${m.text}`).join("\n");
  const message = await getAnthropic().messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 800,
    system: SYSTEM,
    messages: [{ role: "user", content: `User voice: ${voice}\n\nThread:\n${transcript}` }],
  });
  const block = message.content[0];
  if (block.type !== "text") throw new Error("No text returned by model");
  return parseJson(block.text);
}
