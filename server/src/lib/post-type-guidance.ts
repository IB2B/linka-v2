export const POST_TYPE_GUIDANCE: Record<string, string> = {
  news_commentary:
    "trending news stories, industry developments, recent announcements that sparked debate",
  personal_insight:
    "career turning points, lessons from failures, unexpected realizations, mentor advice that stuck",
  how_to_guide:
    "common problems people struggle with, shortcuts you discovered, tools/methods that save time",
  thought_leadership:
    "contrarian opinions, predictions, industry myths that need busting, uncomfortable truths",
  question_engagement:
    "genuine dilemmas you face, debates in your field, decisions you are weighing",
  achievement: "recent wins, milestones hit, goals accomplished, team successes",
  motivational:
    "struggles you overcame, mindset shifts that helped, advice for tough times",
  curated_content:
    "tools you recommend, books that changed your thinking, resources others should know",
  lead_magnet:
    "problems you solve for clients, insights from your expertise, value you can offer",
};

export const POST_TYPES = Object.keys(POST_TYPE_GUIDANCE) as Array<
  keyof typeof POST_TYPE_GUIDANCE
>;
