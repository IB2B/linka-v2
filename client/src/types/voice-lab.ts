export type SampleSource =
  | "linkedin"
  | "twitter"
  | "facebook"
  | "instagram"
  | "threads"
  | "newsletter"
  | "blog"
  | "article"
  | "email"
  | "other";

export type WritingSample = {
  id: string;
  userId: string;
  title: string | null;
  content: string;
  source: SampleSource;
  wordCount: number;
  processedAt: string | null;
  createdAt: string;
};

export type SampleLimits = {
  current: number;
  limit: number;
  canAddMore: boolean;
};

export type VoiceDna = {
  summary: string;
  tone: { primary: string; secondary?: string };
  expertiseAreas: string[];
  contentPillars: string[];
  vocabulary: { distinctive: string[]; avoided: string[] };
  audience: string;
  strengths: string[];
};

export type VoiceProfile = {
  industry: string | null;
  jobTitle: string | null;
  targetAudience: string | null;
  voiceDna: VoiceDna | null;
  version: number;
  updatedAt: string | null;
};
