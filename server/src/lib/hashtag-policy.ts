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

// The tag-picking prompt and the normaliser read the same number, so what is
// asked for and what is enforced cannot drift apart.
export function maxTagsFor(platform: string): number {
  return MAX_TAGS[platform] ?? 3;
}
