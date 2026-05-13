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
