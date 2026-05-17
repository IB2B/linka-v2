export type AccountFilter = "all" | "connected" | "available";

export const ACCOUNT_FILTER_TABS: { key: AccountFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "connected", label: "Connected" },
  { key: "available", label: "Available" },
];
