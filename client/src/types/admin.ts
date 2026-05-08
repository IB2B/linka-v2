import type { UserRole } from "@/types/user-role";

export type UserStatus = "ACTIVE" | "SUSPENDED";

export type AdminUserRow = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  planTier: string;
  avatarUrl: string | null;
  industry: string | null;
  postsCount: number;
  lastActiveAt: string | null;
};

export type ActivityType =
  | "user_signup"
  | "post_generated"
  | "post_published"
  | "post_failed"
  | "subscription_started"
  | "subscription_canceled"
  | "ticket_opened"
  | "feedback_submitted";

export type ActivityActor = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
};

export type ActivityEvent = {
  type: ActivityType;
  at: string;
  detail: string | null;
  actor: ActivityActor | null;
};

export type AdminUserDetail = {
  user: AdminUserRow;
  profile: { industry: string | null; bio: string | null };
  subscription: {
    planTier: string;
    status: string;
    currentPeriodEnd: string | null;
    canceledAt: string | null;
  } | null;
  stats: { generated: number; published: number; failed: number; last30d: number };
  activity: ActivityEvent[];
  platforms: string[];
};

export type AppSettings = {
  maintenanceMode: boolean;
  signupsEnabled: boolean;
  trialDays: number;
  minPasswordLength: number;
  requireMfa: boolean;
  sessionTimeoutMin: number;
  autoSuspendDays: number;
  alertEmail: string | null;
  slackWebhookUrl: string | null;
  dailyDigestEnabled: boolean;
  logoUrl: string | null;
  primaryColor: string | null;
  emailSenderName: string | null;
  emailFooterText: string | null;
};

export type IntegrationStatus = {
  key: string;
  label: string;
  category: "ai" | "billing" | "social" | "search";
  configured: boolean;
};

export type ActivityWindow = { curr: number; prev: number };

export type ActivitySummary = {
  events: ActivityWindow;
  signups: ActivityWindow;
  posts: ActivityWindow;
  failures: ActivityWindow;
  byType: Record<string, number>;
};

export type AdminStats = {
  users: { total: number; active: number; suspended: number; newThisWeek: number };
  posts: { total: number; thisMonth: number };
  subscriptions: { paying: number; free: number };
  tickets: { open: number };
};
