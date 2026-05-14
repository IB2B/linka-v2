import type { AiImageStatus } from "@/types/admin-analytics";

export type Kpi = { curr: number; prev: number };

export type AiUsagePoint = {
  date: string; drafts: number; posted: number; failed: number;
};

export type TopGenerator = {
  id: string; email: string; firstName: string; lastName: string;
  avatarUrl: string | null; drafts: number; images: number;
  tokensInput: number; tokensOutput: number;
};

export type CountRow = { key: string; count: number };

export type AiUsageOverview = {
  range: { days: number };
  kpis: {
    drafts: Kpi;
    posted: Kpi;
    imagesCompleted: Kpi;
    imagesFailed: Kpi;
    tokensInput: Kpi;
    tokensOutput: Kpi;
  };
  series: AiUsagePoint[];
  imageBreakdown: { key: AiImageStatus; count: number }[];
  topGenerators: TopGenerator[];
  platforms: CountRow[];
  models: CountRow[];
};
