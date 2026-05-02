export type Intent = "purchase" | "support" | "faq" | "spam" | "other";

export type AssistResult = {
  intent: Intent;
  confidence: number;
  reply: string;
  shouldAutoReply: boolean;
};
