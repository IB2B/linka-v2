import type { ActivityType } from "@/types/admin";

export type ActivityFilter = { value: ActivityType | "all"; label: string };

export const ACTIVITY_FILTERS: ActivityFilter[] = [
  { value: "all",                   label: "All" },
  { value: "user_signup",           label: "Signups" },
  { value: "post_generated",        label: "Generated" },
  { value: "post_published",        label: "Published" },
  { value: "post_failed",           label: "Failures" },
  { value: "subscription_started",  label: "Subscribed" },
  { value: "subscription_canceled", label: "Canceled" },
  { value: "ticket_opened",         label: "Tickets" },
  { value: "feedback_submitted",    label: "Feedback" },
];
