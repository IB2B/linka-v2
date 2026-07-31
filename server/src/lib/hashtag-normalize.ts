import { maxTagsFor } from "./hashtag-policy";

// LinkedIn's markup renders a tag as "hashtag#leadership", so scraped training
// data carries the bare word and models reproduce it. Only a line made up
// ENTIRELY of "hashtag <word>" groups is rewritten — that is what keeps "I never
// use a hashtag anymore" a sentence instead of a tag.
const WORD = String.raw`[\p{L}\p{N}][\p{L}\p{N}_-]*`;
const SPELLED_LINE = new RegExp(
  String.raw`^[ \t]*hashtag[ \t]+#?${WORD}(?:[ \t]+hashtag[ \t]+#?${WORD})*[ \t]*$`,
  "gimu",
);
const SPELLED_TAG = new RegExp(String.raw`hashtag[ \t]+#?(${WORD})`, "giu");

// A line that is nothing but tags and the separators models put between them.
const TAG_LINE = new RegExp(String.raw`^[ \t]*(?:#${WORD}[ \t,;.]*)+$`, "u");
const TAG = new RegExp(String.raw`#(${WORD})`, "gu");

function repairSpelled(text: string): string {
  return text.replace(SPELLED_LINE, (line) => {
    const tags = [...line.matchAll(SPELLED_TAG)].map((m) => `#${m[1]}`);
    return tags.length ? tags.join(" ") : line;
  });
}

// Same tag in two casings is one tag; the first spelling wins because that is the
// one the writer chose.
function dedupe(tags: string[]): string[] {
  const seen = new Set<string>();
  return tags.filter((t) => {
    const key = t.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// Peels every trailing tag-only line, then re-emits one canonical block. Tags
// scattered over three lines, comma-separated, or duplicated across a rewrite all
// collapse into the same shape.
export function normalizeHashtags(text: string, platform: string): string {
  const lines = repairSpelled(text.trim()).split("\n");
  const tags: string[] = [];
  let end = lines.length;

  while (end > 0) {
    const line = lines[end - 1];
    if (!line.trim()) { end -= 1; continue; }
    if (!TAG_LINE.test(line)) break;
    tags.unshift(...[...line.matchAll(TAG)].map((m) => m[1]));
    end -= 1;
  }

  const body = lines.slice(0, end).join("\n").trimEnd();
  const kept = dedupe(tags).slice(0, maxTagsFor(platform));
  if (!kept.length) return body;
  return `${body}\n\n${kept.map((t) => `#${t}`).join(" ")}`;
}
