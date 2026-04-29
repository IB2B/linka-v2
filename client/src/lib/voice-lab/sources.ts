import type { SampleSource } from "@/types/voice-lab";

export const SAMPLE_SOURCES: { value: SampleSource; label: string }[] = [
  { value: "linkedin", label: "LinkedIn" },
  { value: "twitter", label: "Twitter / X" },
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "threads", label: "Threads" },
  { value: "newsletter", label: "Newsletter" },
  { value: "blog", label: "Blog post" },
  { value: "article", label: "Article" },
  { value: "email", label: "Email" },
  { value: "other", label: "Other" },
];
