import type { NavGroup } from "@/types/nav-item";
import type { LucideIcon } from "lucide-react";

export type SearchItem = { group: string; label: string; href: string; icon: LucideIcon };

export function navToSearchItems(groups: NavGroup[]): SearchItem[] {
  const out: SearchItem[] = [];
  for (const g of groups) {
    for (const item of g.items) {
      out.push({ group: g.label, label: item.label, href: item.href, icon: item.icon });
    }
  }
  return out;
}
