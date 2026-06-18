import type { OpportunityPlatform, StageOutcome } from "./pipeline";

export type CreatePipelineInput = {
  name: string;
  stages?: { name: string; outcome?: StageOutcome }[];
};

export type CreateOppInput = {
  title: string;
  stageId: string;
  contactName?: string | null;
  contactHandle?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  companyName?: string | null;
  sourcePlatform?: OpportunityPlatform | null;
  valueAmount?: number | null;
  valueCurrency?: string | null;
  expectedClose?: string | null;
  notes?: string | null;
  socialUrl?: string | null;
  facebookUrl?: string | null;
  instagramUrl?: string | null;
  xUrl?: string | null;
  tiktokUrl?: string | null;
  threadsUrl?: string | null;
};

export type UpdateOppInput = Partial<{
  title: string;
  contactName: string | null;
  contactHandle: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  companyName: string | null;
  sourcePlatform: OpportunityPlatform | null;
  valueAmount: number | null;
  valueCurrency: string | null;
  expectedClose: string | null;
  notes: string | null;
  socialUrl: string | null;
  facebookUrl: string | null;
  instagramUrl: string | null;
  xUrl: string | null;
  tiktokUrl: string | null;
  threadsUrl: string | null;
}>;

export type CreateStageInput = { name: string; outcome?: StageOutcome };
export type UpdateStageInput = Partial<{ name: string; outcome: StageOutcome }>;
