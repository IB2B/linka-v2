import type { AvatarAspect, AvatarSeconds } from "./avatar-video";
import type { ImageShape } from "./image-shape";

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

// "video" = b-roll clip animated from a generated still.
// "avatar" = a presenter speaking the post to camera (HeyGen).
export type MediaKind = "none" | "image" | "video" | "avatar";

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
  platform: string;
  contentId: string;
  content: string;
};

export type GenerationBatchError = {
  platform: string;
  error: string;
};

export type GenerateInput = {
  postType: PostType;
  topic?: string;
  newsArticle?: NewsArticle;
  platforms?: string[];
  language?: string;
  media?: MediaKind;
  avatarAspect?: AvatarAspect;
  avatarSeconds?: AvatarSeconds;
  imageShape?: ImageShape;
  // Legacy flag still sent by the trends flow; generate page uses `media`.
  withImage?: boolean;
};

export type PostSettings = {
  platforms: string[];
  language: string;
  media: MediaKind;
  avatarAspect: AvatarAspect;
  avatarSeconds: AvatarSeconds;
  imageShape: ImageShape;
};
