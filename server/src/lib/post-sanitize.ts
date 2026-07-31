// LinkedIn's own markup renders a tag as "hashtag#leadership", so scraped
// training data is full of the bare word and models reproduce it — a post ending
// "hashtag leadership hashtag operations" instead of "#leadership #operations".
// Prompting alone does not reliably stop it, so repair it after the fact.

// Only a line made up ENTIRELY of "hashtag <word>" groups is rewritten. Anchoring
// to the whole line is what keeps prose safe: "I never use a hashtag anymore" is
// a sentence, not a tag block, and must be left alone.
const TAG_LINE =
  /^[ \t]*hashtag[ \t]+#?[\p{L}\p{N}][\p{L}\p{N}_-]*(?:[ \t]+hashtag[ \t]+#?[\p{L}\p{N}][\p{L}\p{N}_-]*)*[ \t]*$/gimu;

const ONE_TAG = /hashtag[ \t]+#?([\p{L}\p{N}][\p{L}\p{N}_-]*)/giu;

export function sanitizePost(text: string): string {
  return text.trim().replace(TAG_LINE, (line) => {
    const tags = [...line.matchAll(ONE_TAG)].map((m) => `#${m[1]}`);
    return tags.length ? tags.join(" ") : line;
  });
}
