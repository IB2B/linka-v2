export type FeedbackUser = {
  id: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  avatarUrl: string | null;
};

export type FeedbackRow = {
  id: string;
  category: "bug" | "feature" | "general";
  status: "new" | "triaged" | "closed";
  message: string;
  pageUrl: string | null;
  userAgent: string | null;
  createdAt: string;
  user: FeedbackUser | null;
};

export type FeedbackByCategory = { category: string; count: number };

export type FeedbackSummary = {
  total: number;
  new: number;
  triaged: number;
  closed: number;
  last7d: number;
  byCategory: FeedbackByCategory[];
};

export type FeedbackResult = {
  rows: FeedbackRow[];
  total: number;
  summary: FeedbackSummary;
};

export type FeedbackQuery = { q?: string; category?: string; status?: string };
