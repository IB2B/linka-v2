export type PostType =
  | "news_commentary"
  | "personal_insight"
  | "how_to_guide"
  | "thought_leadership"
  | "question_engagement"
  | "achievement"
  | "motivational"
  | "curated_content"
  | "lead_magnet";

export type TopicMode = "ai" | "manual";

export type TopicSuggestion = {
  topic: string;
  reasoning?: string;
};

export type NewsArticle = {
  id: string;
  title: string;
  url: string;
  source: string;
  summary?: string;
  imageUrl?: string;
  publishedAt?: string;
};

export type GenerationResult = {
  contentId: string;
  content: string;
};

export type GenerateInput = {
  postType: PostType;
  topic?: string;
  newsArticle?: NewsArticle;
  platform?: string;
  language?: string;
  withImage?: boolean;
};

export type PostSettings = {
  platform: string;
  language: string;
  withImage: boolean;
};
