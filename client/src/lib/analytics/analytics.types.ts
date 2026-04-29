export type AnalyticsDelta = {
  current: number;
  previous: number;
  diff: number;
  pct: number | null;
};

export type AnalyticsStats = {
  total: AnalyticsDelta;
  posted: AnalyticsDelta;
  scheduled: AnalyticsDelta;
  drafts: AnalyticsDelta;
};

export type AnalyticsBucket = {
  key: string;
  label: string;
  count: number;
};

export type AnalyticsDaily = {
  date: string;
  count: number;
};

export type AnalyticsInsights = {
  bestDay: { date: string; count: number } | null;
  avgPerDay: number;
  topPlatform: { label: string; count: number } | null;
  imageAttachRate: number;
};

export type Analytics = {
  stats: AnalyticsStats;
  byStatus: AnalyticsBucket[];
  byPlatform: AnalyticsBucket[];
  daily: AnalyticsDaily[];
  insights: AnalyticsInsights;
  recent: import("@/types/post").GeneratedPost[];
};
