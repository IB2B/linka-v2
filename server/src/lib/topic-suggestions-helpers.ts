import { POST_TYPE_GUIDANCE } from "./post-type-guidance";

export function buildPrompt(
  postType: string,
  count: number,
  jobTitle: string,
  industry: string,
  usedTopics: string[],
  language?: string,
): string {
  const guidance = POST_TYPE_GUIDANCE[postType] ?? "relevant professional topics";
  const avoid = usedTopics.length
    ? `AVOID (already used): ${usedTopics.slice(0, 5).join(", ")}\n`
    : "";
  const lang = language && language !== "en"
    ? `Write the topics in language code "${language}".\n`
    : "";
  return `${count + 3} topic ideas for a ${jobTitle} (${industry}) LinkedIn post.

TYPE: ${postType.replace(/_/g, " ")}
FOCUS: ${guidance}
${avoid}${lang}Return ONLY a JSON array of short topic strings (5-10 words each). No descriptions.
Example: ["Topic one here", "Topic two here"]`;
}

export function parseTopics(text: string): string[] {
  const match = text.match(/\[[\s\S]*?\]/);
  const json = match ? match[0] : text;
  const arr = JSON.parse(json);
  return Array.isArray(arr) ? arr.filter((x): x is string => typeof x === "string") : [];
}

export function dedupeAgainst(topics: string[], used: string[]): string[] {
  return topics.filter((t) => {
    const a = t.toLowerCase();
    return !used.some((u) => {
      const b = u.toLowerCase();
      return a.includes(b) || b.includes(a);
    });
  });
}
