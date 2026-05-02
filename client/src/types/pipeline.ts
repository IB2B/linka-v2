export type OpportunityPlatform =
  | "linkedin" | "x" | "instagram" | "threads" | "facebook" | "tiktok";

export type StageOutcome = "open" | "won" | "lost";
export type OpportunityStatus = StageOutcome;

export type Pipeline = { id: string; name: string; isDefault: boolean };

export type Stage = {
  id: string;
  name: string;
  position: number;
  outcome: StageOutcome;
};

export type Opportunity = {
  id: string;
  pipelineId: string;
  stageId: string;
  title: string;
  contactName: string | null;
  contactHandle: string | null;
  sourcePlatform: OpportunityPlatform | null;
  status: OpportunityStatus;
  notes: string | null;
  conversationId: string | null;
  position: number;
  lastActivityAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Board = {
  pipeline: Pipeline | null;
  stages: Stage[];
  opportunities: Opportunity[];
};

export type CreateOppInput = {
  title: string;
  stageId: string;
  contactName?: string | null;
  contactHandle?: string | null;
  sourcePlatform?: OpportunityPlatform | null;
  notes?: string | null;
};

export type UpdateOppInput = Partial<{
  title: string;
  contactName: string | null;
  contactHandle: string | null;
  sourcePlatform: OpportunityPlatform | null;
  notes: string | null;
}>;
