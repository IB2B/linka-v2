"use client";

import {
  User, Lock, SlidersHorizontal, Bell, Link2, AlertTriangle, Activity, Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type SectionId =
  | "profile" | "security" | "aiInstructions" | "preferences"
  | "notifications" | "accounts" | "services" | "danger";

const SECTIONS: { id: SectionId; icon: LucideIcon }[] = [
  { id: "profile", icon: User },
  { id: "security", icon: Lock },
  { id: "aiInstructions", icon: Sparkles },
  { id: "preferences", icon: SlidersHorizontal },
  { id: "notifications", icon: Bell },
  { id: "accounts", icon: Link2 },
  { id: "services", icon: Activity },
  { id: "danger", icon: AlertTriangle },
];

type Props = { active: string; onSelect: (id: string) => void };

export function SettingsNav({ active, onSelect }: Props) {
  const t = useTranslations("settings.sections");
  return (
    <nav className="-mx-2 flex gap-1 overflow-x-auto px-2 pb-1 lg:sticky lg:top-6 lg:mx-0 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:px-0 lg:pb-0">
      {SECTIONS.map(({ id, icon: Icon }) => {
        const isDanger = id === "danger";
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className={cn(
              "flex shrink-0 cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-sm transition-colors lg:shrink",
              isActive && isDanger && "bg-destructive/10 font-medium text-destructive",
              isActive && !isDanger && "bg-muted font-medium text-foreground",
              !isActive && isDanger && "text-destructive/70 hover:bg-destructive/5 hover:text-destructive",
              !isActive && !isDanger && "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
            )}
          >
            <Icon className="size-4 shrink-0" />
            <span className="truncate">{t(id)}</span>
          </button>
        );
      })}
    </nav>
  );
}
