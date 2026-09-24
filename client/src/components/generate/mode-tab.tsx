"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TabProps = { active: boolean; onClick: () => void; children: React.ReactNode };

export function ModeTab({ active, onClick, children }: TabProps) {
  return (
    <Button
      type="button"
      size="sm"
      variant="ghost"
      onClick={onClick}
      className={cn("flex-1 gap-2", active && "bg-background text-foreground shadow-xs")}
    >
      {children}
    </Button>
  );
}
