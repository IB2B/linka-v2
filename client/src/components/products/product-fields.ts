import type { InstructionField } from "@/components/settings/ai-instruction-fields";

// Long-form product details. Name and link are plain inputs in the form itself.
export const PRODUCT_TEXT_FIELDS: (InstructionField & { rows: number; required?: boolean })[] = [
  {
    name: "pitch", label: "One-line pitch", rows: 2, required: true,
    placeholder: "Linka writes your social posts in your own voice.",
  },
  {
    name: "audience", label: "Who it's for", rows: 2,
    placeholder: "Founders and small B2B teams who don't have time to post.",
  },
  {
    name: "features", label: "Key features and benefits", rows: 4,
    placeholder: "One per line:\nWrites posts in your voice\nSchedules to 5 platforms\nMakes images and avatar videos",
    hint: "The AI only claims what you write here, so be specific.",
  },
  {
    name: "cta", label: "Call to action", rows: 1,
    placeholder: "Start free for 7 days",
    hint: "What readers should do. Leave blank for a simple \"try it\".",
  },
];
