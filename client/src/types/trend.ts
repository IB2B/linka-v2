export type Trend = {
  id: string;
  title: string;
  url: string | null;
  source: string | null;
  summary: string | null;
  score: number;
  fetchedAt: string;
};

export type TrendIdea = {
  id: string;
  trendId: string;
  hook: string;
  angle: string | null;
  platform: string | null;
  score: number;
};

export type TrendsPayload = {
  trends: Trend[];
  ideas: TrendIdea[];
  suggestedTopics: string[];
};
