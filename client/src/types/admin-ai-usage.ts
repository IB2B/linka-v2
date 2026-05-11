import type { AiImageStatus } from "@/types/admin-analytics";

export type Kpi = { curr: number; prev: number };

export type AiUsagePoint = {
  date: string; drafts: number; images: number; failedImages: number;
};

export type TopGenerator = {
  id: string; email: string; firstName: string; lastName: string;
  avatarUrl: string | null; drafts: number; images: number;
};

export type CountRow = { key: string; count: number };

export type AiUsageOverview = {
  range: { days: number };
  kpis: {
    drafts: Kpi;
    posted: Kpi;
    imagesCompleted: Kpi;
    imagesFailed: Kpi;
  };
  series: AiUsagePoint[];
  imageBreakdown: { key: AiImageStatus; count: number }[];
  topGenerators: TopGenerator[];
  platforms: CountRow[];
};
