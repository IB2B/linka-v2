import { getAnthropic } from "./anthropic";

// A written post and a spoken script are different things. This rewrites the
// post into words a presenter can say to camera without sounding like they are
// reading a LinkedIn caption aloud.
const WORDS_PER_SEC = 2.4; // natural presenter pace

const SYSTEM = `You turn a written social post into a short script a real person
speaks straight to camera. Spoken register, not written: short sentences, plain
words, contractions, one idea per breath. Open with a hook in the first line that
earns the next five seconds. Close with one clear takeaway or invitation.
Never narrate formatting — no hashtags, emoji, markdown, bullet marks, URLs,
stage directions, speaker labels or scene notes. Write in the SAME language as
the post. Output ONLY the words to be spoken.`;

export async function buildAvatarScript(
  postContent: string, platform: string, seconds = 30, tone?: string,
): Promise<string> {
  const words = Math.round(seconds * WORDS_PER_SEC);
  const brand = tone?.trim()
    ? `\n\nSpeak in this brand tone of voice: "${tone.trim().slice(0, 300)}".`
    : "";
  const res = await getAnthropic().messages.create({
    model: "claude-sonnet-5",
    // Sonnet 5 thinks by default and max_tokens caps thinking + text together,
    // so leaving it on would eat the script's budget and truncate mid-sentence.
    // A post rewrite does not need reasoning; it needs the words.
    thinking: { type: "disabled" },
    max_tokens: 1200,
    system: SYSTEM,
    messages: [{
      role: "user",
      content: `Post (${platform}):
"${postContent.slice(0, 2000)}"${brand}

Rewrite it as roughly ${words} words (about ${seconds} seconds spoken).
Return only the script.`,
    }],
  });
  const block = res.content[0];
  if (block.type !== "text") throw new Error("No script returned");
  return block.text.trim();
}
