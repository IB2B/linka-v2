"use client";

import {
  User, Lock, SlidersHorizontal, Bell, Link2, ToggleRight, AlertTriangle,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const SECTIONS: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "security", label: "Security", icon: Lock },
  { id: "preferences", label: "Preferences", icon: SlidersHorizontal },
  { id: "features", label: "Features", icon: ToggleRight },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "accounts", label: "Connected Accounts", icon: Link2 },
  { id: "danger", label: "Danger Zone", icon: AlertTriangle },
];

type Props = { active: string; onSelect: (id: string) => void };

export function SettingsNav({ active, onSelect }: Props) {
  return (
    <nav className="sticky top-6 flex flex-col gap-0.5">
      {SECTIONS.map(({ id, label, icon: Icon }) => {
        const isDanger = id === "danger";
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className={cn(
              "flex cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-sm transition-colors",
              isActive && isDanger && "bg-destructive/10 font-medium text-destructive",
              isActive && !isDanger && "bg-muted font-medium text-foreground",
              !isActive && isDanger && "text-destructive/70 hover:bg-destructive/5 hover:text-destructive",
              !isActive && !isDanger && "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
            )}
          >
            <Icon className="size-4 shrink-0" />
            <span className="truncate">{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
