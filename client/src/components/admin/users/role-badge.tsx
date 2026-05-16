import { Badge } from "@/components/ui/badge";
import type { UserRole } from "@/types/user-role";

const VARIANTS: Record<UserRole, "default" | "secondary" | "outline"> = {
  ADMIN: "default",
  USER: "outline",
};

const LABEL: Record<UserRole, string> = {
  ADMIN: "Admin",
  USER: "User",
};

export function RoleBadge({ role }: { role: UserRole }) {
  return <Badge variant={VARIANTS[role]}>{LABEL[role]}</Badge>;
}
