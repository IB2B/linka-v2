export type OpportunityPlatform =
  | "linkedin" | "x" | "instagram" | "threads" | "facebook" | "tiktok";

export type StageOutcome = "open" | "won" | "lost";
export type OpportunityStatus = StageOutcome;

export type SocialKey =
  | "socialUrl" | "facebookUrl" | "instagramUrl" | "xUrl" | "tiktokUrl" | "threadsUrl";

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
  socialUrl: string | null;
  facebookUrl: string | null;
  instagramUrl: string | null;
  xUrl: string | null;
  tiktokUrl: string | null;
  threadsUrl: string | null;
  position: number;
  lastActivityAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Board = {
  pipelines: Pipeline[];
  pipeline: Pipeline | null;
  stages: Stage[];
  opportunities: Opportunity[];
};

export type {
  CreatePipelineInput, CreateOppInput, UpdateOppInput,
  CreateStageInput, UpdateStageInput,
} from "./pipeline-inputs";
