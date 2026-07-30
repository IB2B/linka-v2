export type InstructionField = {
  name: string;
  label: string;
  placeholder: string;
  hint?: string;
};

// Filled once, applied to every platform. Field names match PlatformInstructions
// keys and the server's zod schema.
export const SHARED_FIELDS: InstructionField[] = [
  { name: "whoIAm", label: "Who you are", placeholder: "B2B founder, 10 years in fintech…" },
  { name: "whatIDo", label: "What you do", placeholder: "I help SaaS teams ship faster…" },
  {
    name: "visualStyle",
    label: "Image & video design",
    placeholder: "Bold warm colours, cream text, clean sans-serif, minimal, film-grain mood…",
    hint: "Colours, text colours, fonts and mood — used to design the generated images and videos.",
  },
];

// Answered per platform: the same person posts differently on LinkedIn and X.
export const PLATFORM_FIELDS: InstructionField[] = [
  { name: "goals", label: "Your goal on this platform", placeholder: "Build authority and get inbound leads…" },
  { name: "interests", label: "People, companies & topics you follow", placeholder: "Founders, VCs, AI tooling…" },
  { name: "postTypes", label: "Types of posts you want", placeholder: "Short stories, hot takes, how-tos…" },
  { name: "tone", label: "Tone of voice", placeholder: "Direct, warm, a little contrarian…" },
  { name: "extraNotes", label: "Anything else the AI should know", placeholder: "Avoid jargon, never use emojis…" },
];
