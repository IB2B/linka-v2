// Turns scraped or uploaded markdown into plain reading text for the AI:
// drops images and raw HTML, keeps link text without the URL, removes heading,
// emphasis and quote markers, and squeezes blank lines. Nothing here is ever
// rendered as HTML; this only keeps paths and syntax out of the prompt and posts.
export function cleanKnowledge(text: string): string {
  return text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")              // ![alt](src) images
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")           // [text](url) → text
    .replace(/<\/?[a-z][^>]*>/gi, "")                  // stray HTML tags
    .replace(/^\s{0,3}#{1,6}\s+/gm, "")                // # headings
    .replace(/^\s{0,3}>\s?/gm, "")                     // > quotes
    .replace(/^\s*[-*_]{3,}\s*$/gm, "")                // --- rules
    .replace(/(\*\*|__|`{1,3})/g, "")                  // bold / code markers
    .replace(/[ \t]+$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
