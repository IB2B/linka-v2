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

export interface WritingSample {
  id: string;
  userId: string;
  title: string | null;
  content: string;
  source: SampleSource;
  wordCount: number;
  processedAt: string | null;
  createdAt: string;
}

export interface VoiceDna {
  summary: string;
  tone: { primary: string; secondary?: string };
  expertiseAreas: string[];
  contentPillars: string[];
  vocabulary: { distinctive: string[]; avoided: string[] };
  audience: string;
  strengths: string[];
}

export interface VoiceProfile {
  industry: string | null;
  jobTitle: string | null;
  targetAudience: string | null;
  voiceDna: VoiceDna | null;
  version: number;
  updatedAt: string | null;
}

export const SAMPLE_LIMITS: Record<string, number> = {
  free: 5, starter: 30, pro: 100, scale: 500,
};
