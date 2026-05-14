export type UserAiStats = {
  total: number;
  published: number;
  tokensInput: number;
  tokensOutput: number;
  avgTokens: number;
  last30: number;
  last30TokensInput: number;
  last30TokensOutput: number;
};

export type UserDraftRow = {
  id: string;
  prompt: string | null;
  platform: string | null;
  status: string;
  tokensInput: number | null;
  tokensOutput: number | null;
  model: string | null;
  imageStatus: string | null;
  createdAt: string;
};

export type UserAiUsage = {
  stats: UserAiStats;
  drafts: UserDraftRow[];
};
