import type { LucideIcon } from "lucide-react";
import type messagesEn from "@/messages/en.json";

export type NavKey = keyof typeof messagesEn.nav;

export type NavItem = {
  label: NavKey;
  href: string;
  icon: LucideIcon;
  badge?: number;
};

export type NavGroup = {
  label: NavKey;
  items: NavItem[];
};
