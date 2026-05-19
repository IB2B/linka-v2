"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  CommandDialog, CommandInput, CommandList, CommandEmpty,
  CommandGroup, CommandItem,
} from "@/components/ui/command";
import { navToSearchItems, type SearchItem } from "./nav-to-search-items";
import type { NavGroup, NavKey } from "@/types/nav-item";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groups: NavGroup[];
};

function groupBy(items: SearchItem[]): Record<NavKey, SearchItem[]> {
  const out = {} as Record<NavKey, SearchItem[]>;
  for (const item of items) (out[item.group] ??= []).push(item);
  return out;
}

export function SearchPalette({ open, onOpenChange, groups }: Props) {
  const router = useRouter();
  const t = useTranslations("nav");
  const grouped = groupBy(navToSearchItems(groups));

  const go = (href: string) => {
    onOpenChange(false);
    router.push(href);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search pages…" />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>
        {Object.entries(grouped).map(([group, items]) => (
          <CommandGroup key={group} heading={t(group as NavKey)}>
            {items.map((item) => {
              const Icon = item.icon;
              const label = t(item.label);
              return (
                <CommandItem
                  key={item.href}
                  value={`${label} ${item.href}`}
                  onSelect={() => go(item.href)}
                >
                  <Icon className="size-4 text-muted-foreground" />
                  {label}
                </CommandItem>
              );
            })}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
}
