export type Intent = "purchase" | "support" | "faq" | "spam" | "other";

export type AssistResult = {
  intent: Intent;
  confidence: number;
  summary: string;
  replies: { label: string; text: string }[];
  shouldAutoReply: boolean;
};
