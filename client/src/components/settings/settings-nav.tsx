"use client";

import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "profile", label: "Profile" },
  { id: "security", label: "Security" },
  { id: "preferences", label: "Preferences" },
  { id: "notifications", label: "Notifications" },
  { id: "accounts", label: "Connected Accounts" },
  { id: "danger", label: "Danger Zone" },
];

type Props = { active: string; onSelect: (id: string) => void };

export function SettingsNav({ active, onSelect }: Props) {
  return (
    <nav className="sticky top-6 flex flex-col">
      {SECTIONS.map(({ id, label }) => {
        const isDanger = id === "danger";
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className={cn(
              "cursor-pointer border-l-2 py-1.5 pl-3 text-left text-sm transition-colors",
              isActive && isDanger
                ? "border-destructive font-medium text-destructive"
                : isActive
                  ? "border-foreground font-medium text-foreground"
                  : isDanger
                    ? "border-transparent text-destructive/60 hover:border-destructive/40 hover:text-destructive"
                    : "border-transparent text-muted-foreground hover:border-muted-foreground/40 hover:text-foreground"
            )}
          >
            {label}
          </button>
        );
      })}
    </nav>
  );
}
