import { getAnthropic } from "./anthropic";
import { maxTagsFor } from "./hashtag-policy";

// Haiku: picking tags for text that already exists is a small, bounded job.
const MODEL = "claude-haiku-4-5-20251001";

const SYSTEM = `You choose the hashtags for a social post that is already
written. You are not writing copy. Your only job is to pick the tags that put
this particular post in front of the people who care about its subject. Output
only the tags.`;

function userPrompt(content: string, platform: string, max: number): string {
  return `Post (${platform}):
"${content.slice(0, 2000)}"

Work out (silently) what this post is actually about: the industry it belongs to,
the practice or craft it concerns, and the specific thing it happened to — a
system, a team, a tool, a place, a decision.

Then choose at most ${max} tags:
- Start from what the post NAMES. A tool, product, language, platform, practice or
  place mentioned in it is almost always the best tag there is: #stripe, #postgres,
  #standups, #rustlang, #milano. Use the name people actually use.
- Every tag must already exist as a community or a search on this platform. If you
  cannot picture a feed of other people's posts under it, it is not a tag.
- Prefer the established term over a narrower one you had to invent: #standups not
  #standupculture, #postgres not #databasefails, #hiring not #hiringlessons.
- An industry tag (#fintech, #devops, #recruiting) belongs only if the post is
  ABOUT that industry — not merely written by someone who works in it. Someone in
  fintech writing about meetings has written about meetings.
- Never badge words (#leadership #growth #success #motivation #mindset
  #innovation). Never the writer's narrative (#founderlessons #myjourney
  #lessonslearned). Never the argument turned into a noun (#productivitymyths
  #meetingculture). Never management-speak compounds that mean nothing in a feed
  (#operationsmanagement #processimprovement #teammanagement #bestpractices).
- Fewer and sharper beats ${max} vague ones — two is often the honest answer, and
  one specific tag is worth more than three broad ones. If the post has no clear
  subject, output nothing.

Output only the tags, space separated, each starting with #.`;
}

export async function buildHashtags(
  content: string, platform: string,
): Promise<string[]> {
  const max = maxTagsFor(platform);
  if (max === 0) return [];
  const res = await getAnthropic().messages.create({
    model: MODEL,
    max_tokens: 80,
    system: SYSTEM,
    messages: [{ role: "user", content: userPrompt(content, platform, max) }],
  });
  const block = res.content[0];
  if (block.type !== "text") return [];
  return [...block.text.matchAll(/#([\p{L}\p{N}][\p{L}\p{N}_-]*)/gu)]
    .map((m) => `#${m[1]}`);
}
