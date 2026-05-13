export type AdminSubscriptionRow = {
  id: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
  planTier: string;
  status: string;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
  canceledAt: string | null;
  mrr: number;
  createdAt: string | null;
};

export type SubsByTier = { tier: string; count: number; mrr: number };

export type AdminSubsSummary = {
  mrr: number;
  arr: number;
  paying: number;
  free: number;
  trialing: number;
  canceledLast30d: number;
  byTier: SubsByTier[];
};

export type AdminSubsResult = {
  rows: AdminSubscriptionRow[];
  total: number;
  summary: AdminSubsSummary;
};

export type SubsQuery = { q?: string; tier?: string; status?: string; from?: string; to?: string };
