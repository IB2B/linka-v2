export type IntegrationStatus = {
  key: string;
  label: string;
  category: "ai" | "billing" | "social" | "search" | "email";
  configured: boolean;
  reachable: boolean | null;
  latencyMs: number | null;
  error?: string;
};

export type PlatformSettings = {
  signupsEnabled: boolean;
  maintenanceMode: boolean;
  maintenanceMessage: string | null;
  announcementEnabled: boolean;
  announcementMessage: string | null;
};
