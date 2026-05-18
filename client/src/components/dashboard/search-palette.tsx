"use client";

import { useRouter } from "next/navigation";
import {
  CommandDialog, CommandInput, CommandList, CommandEmpty,
  CommandGroup, CommandItem,
} from "@/components/ui/command";
import { navToSearchItems, type SearchItem } from "./nav-to-search-items";
import type { NavGroup } from "@/types/nav-item";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groups: NavGroup[];
};

function groupBy(items: SearchItem[]): Record<string, SearchItem[]> {
  const out: Record<string, SearchItem[]> = {};
  for (const item of items) (out[item.group] ??= []).push(item);
  return out;
}

export function SearchPalette({ open, onOpenChange, groups }: Props) {
  const router = useRouter();
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
          <CommandGroup key={group} heading={group}>
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <CommandItem
                  key={item.href}
                  value={`${item.label} ${item.href}`}
                  onSelect={() => go(item.href)}
                >
                  <Icon className="size-4 text-muted-foreground" />
                  {item.label}
                </CommandItem>
              );
            })}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
}
