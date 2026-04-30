import type { TicketCategory, TicketPriority } from "@/lib/support/support.types";

export const CATEGORIES: { value: TicketCategory; label: string }[] = [
  { value: "bug", label: "Bug / something broken" },
  { value: "billing", label: "Billing & subscription" },
  { value: "feature", label: "Feature request" },
  { value: "account", label: "Account & login" },
  { value: "other", label: "Other" },
];

export const PRIORITIES: { value: TicketPriority; label: string }[] = [
  { value: "low", label: "Low" },
  { value: "normal", label: "Normal" },
  { value: "high", label: "High" },
  { value: "urgent", label: "Urgent" },
];
