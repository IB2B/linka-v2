// Tag counts are platform etiquette, not preference. LinkedIn's feed reads 3 as
// normal and 10 as spam. X readers skim past more than a couple. Instagram is the
// one place a handful still earns reach. Facebook stopped rewarding them years
// ago, and on Reddit any hashtag marks you as someone who wandered in from
// LinkedIn. 0 means strip them.
export const MAX_TAGS: Record<string, number> = {
  linkedin: 3,
  instagram: 5,
  tiktok: 4,
  youtube: 3,
  pinterest: 3,
  threads: 2,
  twitter: 2,
  bluesky: 2,
  facebook: 0,
  reddit: 0,
};

export function maxTagsFor(platform: string): number {
  return MAX_TAGS[platform] ?? 3;
}

// The prompt and the normaliser read the same numbers, so guidance and
// enforcement can never drift apart.
export function hashtagRule(platform: string): string {
  const max = maxTagsFor(platform);
  if (max === 0) {
    return "No hashtags anywhere — on this platform they read as an outsider.";
  }
  return `Hashtags: at most ${max}, on their own final line, written as #word `
    + `— never spell out the word "hashtag". Each must name something this post `
    + `is actually about (a niche, a tool, a place, a craft). Generic badges like `
    + `#leadership #growth #innovation #success #motivation are AI filler — leave `
    + `them out, and use fewer than ${max} rather than padding.`;
}
