import { getAnthropic } from "../lib/anthropic";

export async function summarizeThread(
  thread: { direction: "incoming" | "outgoing"; text: string }[],
): Promise<string> {
  const transcript = thread.slice(-50).map((m) =>
    `${m.direction === "incoming" ? "Them" : "You"}: ${m.text}`).join("\n");
  const message = await getAnthropic().messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 300,
    system: "Summarize this DM conversation in 2-4 concise sentences. Cover: what they want, current status, any action needed. Be direct, no fluff.",
    messages: [{ role: "user", content: transcript }],
  });
  const block = message.content[0];
  if (block.type !== "text") throw new Error("No text returned");
  return block.text.trim();
}
