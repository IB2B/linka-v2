export type SupportStatus = "open" | "pending" | "resolved" | "closed";
export type SupportPriority = "low" | "normal" | "high" | "urgent";
export type SupportCategory = "bug" | "billing" | "feature" | "account" | "other";

export type SupportUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
};

export type SupportRow = {
  id: string;
  subject: string;
  body: string;
  status: SupportStatus;
  priority: SupportPriority;
  category: SupportCategory | null;
  createdAt: string;
  updatedAt: string;
  closedAt: string | null;
  replyCount: number;
  user: SupportUser;
};

export type SupportByCategory = { category: string; count: number };

export type SupportSummary = {
  total: number;
  open: number;
  pending: number;
  resolved: number;
  closed: number;
  urgent: number;
  last7d: number;
  byCategory: SupportByCategory[];
};

export type SupportResult = {
  rows: SupportRow[];
  total: number;
  summary: SupportSummary;
};

export type SupportQuery = {
  q?: string; status?: string; priority?: string; category?: string;
};
