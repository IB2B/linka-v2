import type { TicketPriority } from "@/lib/support/support.types";

export const RESPONSE_TIMES: Record<TicketPriority, string> = {
  urgent: "within a few hours",
  high: "within 1 business day",
  normal: "within 1–2 business days",
  low: "within 3 business days",
};

export const SUPPORT_EMAIL = "support@linka.app";
