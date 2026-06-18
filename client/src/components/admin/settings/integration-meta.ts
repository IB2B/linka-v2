import { Sparkles, CreditCard, Share2, Search, Mail, type LucideIcon } from "lucide-react";
import type { IntegrationStatus } from "@/types/admin-settings.types";

type Cat = IntegrationStatus["category"];

export const CATEGORY_ORDER: Cat[] = ["ai", "billing", "social", "search", "email"];

export const CATEGORY_META: Record<Cat, { label: string; Icon: LucideIcon }> = {
  ai: { label: "AI", Icon: Sparkles },
  billing: { label: "Billing", Icon: CreditCard },
  social: { label: "Social", Icon: Share2 },
  search: { label: "Search", Icon: Search },
  email: { label: "Email", Icon: Mail },
};
