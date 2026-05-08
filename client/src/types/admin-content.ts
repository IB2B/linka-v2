export type AdminContentRow = {
  id: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
  excerpt: string;
  imageUrl: string | null;
  platform: string | null;
  platforms: string[];
  status: "draft" | "scheduled" | "posted" | "failed";
  scheduledFor: string | null;
  postedAt: string | null;
  createdAt: string;
};

export type ContentByStatus = { status: string; count: number };
export type ContentByPlatform = { platform: string; count: number };

export type AdminContentSummary = {
  total: number;
  thisMonth: number;
  prevMonth: number;
  posted: number;
  scheduled: number;
  failed: number;
  drafts: number;
  withImage: number;
  byStatus: ContentByStatus[];
  byPlatform: ContentByPlatform[];
};

export type AdminContentResult = {
  rows: AdminContentRow[];
  total: number;
  summary: AdminContentSummary;
};

export type ContentQuery = { q?: string; status?: string; platform?: string };
