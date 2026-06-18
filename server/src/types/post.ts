export type PostStatus = "draft" | "scheduled" | "posted" | "failed";
export type ImageStatus =
  | "pending" | "generating" | "completed" | "failed" | "skipped";

export type GeneratedPost = {
  id: string;
  userId: string;
  prompt: string | null;
  content: string;
  imageUrl: string | null;
  imageStatus: ImageStatus;
  imagePrompt: string | null;
  imageError: string | null;
  platform: string | null;
  scheduledPlatforms: string[] | null;
  status: PostStatus;
  scheduledFor: string | null;
  postedAt: string | null;
  createdAt: string;
  latePostId: string | null;
  viralityScore: number | null;
  viralityReasons: string[] | null;
  viralitySuggestions: string[] | null;
};
