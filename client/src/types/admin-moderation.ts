export type FlagPerson = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
};

export type FlagPost = {
  excerpt: string;
  imageUrl: string | null;
  platform: string | null;
  status: string;
  hiddenAt: string | null;
};

export type FlagRow = {
  id: string;
  contentId: string;
  status: "pending" | "reviewing" | "actioned" | "dismissed";
  reason: "spam" | "harassment" | "hate" | "misinformation" | "sexual" | "violence" | "other";
  details: string | null;
  resolution: "none" | "dismissed" | "hidden" | "user_warned" | "user_suspended";
  createdAt: string;
  reviewedAt: string | null;
  reporter: FlagPerson;
  author: FlagPerson;
  post: FlagPost;
};

export type FlagsByReason = { reason: string; count: number };

export type ModerationSummary = {
  pending: number;
  reviewing: number;
  actionedLast30d: number;
  dismissedLast30d: number;
  totalOpen: number;
  byReason: FlagsByReason[];
};

export type ModerationResult = {
  rows: FlagRow[];
  total: number;
  summary: ModerationSummary;
};

export type ModerationQuery = { q?: string; status?: string; reason?: string };
