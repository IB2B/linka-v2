import type { DashboardUser } from "@/types/dashboard-user";

export function getInitials(user: DashboardUser): string {
  const initial = (user.firstName[0] ?? "") + (user.lastName[0] ?? "");
  return (initial || user.email[0] || "?").toUpperCase();
}

export function getDisplayName(user: DashboardUser): string {
  const full = `${user.firstName} ${user.lastName}`.trim();
  return full || user.email;
}
