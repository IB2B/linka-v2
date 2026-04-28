import type { USER_ROLES } from "@/lib/auth/constants";

export type UserRole = (typeof USER_ROLES)[number];
