export type IntegrationStatus = {
  key: string;
  label: string;
  category: "ai" | "billing" | "social" | "search" | "email";
  configured: boolean;
};
