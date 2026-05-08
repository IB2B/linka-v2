export type UsersFilter = {
  value: string;
  label: string;
  role?: "USER" | "ADMIN";
  status?: "ACTIVE" | "SUSPENDED";
};

export const USERS_FILTERS: UsersFilter[] = [
  { value: "all",       label: "All" },
  { value: "active",    label: "Active",    status: "ACTIVE" },
  { value: "suspended", label: "Suspended", status: "SUSPENDED" },
  { value: "admins",    label: "Admins",    role: "ADMIN" },
];

export function filterFromParams(params: { role?: string; status?: string }): string {
  if (params.status === "ACTIVE") return "active";
  if (params.status === "SUSPENDED") return "suspended";
  if (params.role === "ADMIN") return "admins";
  return "all";
}
