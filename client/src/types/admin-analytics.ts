export type AnalyticsKpi = { curr: number; prev: number };

export type AnalyticsPoint = {
  date: string; signups: number; published: number; failed: number;
};

export type CountRow = { key: string; count: number };

export type TopPublisher = {
  id: string; email: string; firstName: string; lastName: string;
  avatarUrl: string | null; count: number;
};

export type AiImageStatus =
  "pending" | "generating" | "completed" | "failed" | "skipped";

export type AiUsage = {
  drafts: number;
  posted: number;
  imagesCompleted: number;
  imagesFailed: number;
  imageBreakdown: { key: AiImageStatus; count: number }[];
};

export type AnalyticsOverview = {
  range: { days: number };
  kpis: {
    signups: AnalyticsKpi;
    postsPublished: AnalyticsKpi;
    activePublishers: AnalyticsKpi;
    failures: AnalyticsKpi;
  };
  series: AnalyticsPoint[];
  platforms: CountRow[];
  plans: CountRow[];
  topPublishers: TopPublisher[];
  engagement: { likes: number; comments: number; views: number; shares: number };
  funnel: { signups: number; activated: number; engaged: number };
  hours: { hour: number; count: number }[];
  industries: { industry: string; count: number }[];
  ai: AiUsage;
};
