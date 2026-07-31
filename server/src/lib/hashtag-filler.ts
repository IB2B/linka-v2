// Badge tags. They attach to any post on any subject, which is exactly why they
// carry no signal — nobody browses #success looking for your reconciliation bug.
// Prompting against them helps and does not hold, so they are removed outright.
// Deliberately narrow: only words that are pure self-description. #fintech,
// #standups and #rustlang are subjects and must survive.
const FILLER = new Set([
  "leadership", "growth", "innovation", "success", "motivation", "mindset",
  "hustle", "inspiration", "entrepreneurship", "entrepreneur", "business",
  "professional", "career", "goals", "grind", "winning", "excellence",
  "transformation", "synergy", "thoughtleadership", "personalbranding",
  "lessonslearned", "lifelessons", "mondaymotivation", "riseandgrind",
]);

export function isFiller(tag: string): boolean {
  return FILLER.has(tag.toLowerCase());
}
