"use client";

import { Plus } from "lucide-react";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuGroup, DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { PlatformIcon } from "@/components/accounts/platform-icon";
import { Button } from "@/components/ui/button";
import type { SocialConfig } from "./opp-social-config";

type Props = {
  available: SocialConfig[];
  onAdd: (cfg: SocialConfig) => void;
};

export function OppSocialAdd({ available, onAdd }: Props) {
  if (available.length === 0) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={
        <Button variant="ghost" size="sm" className="h-7 gap-1.5 text-xs text-muted-foreground" />
      }>
        <Plus className="size-3.5" />
        Add profile
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          {available.map((cfg) => (
            <DropdownMenuItem key={cfg.key} onClick={() => onAdd(cfg)}>
              <span
                className="flex size-5 shrink-0 items-center justify-center rounded-full text-white"
                style={{ background: cfg.color }}>
                <PlatformIcon platform={cfg.iconPlatform} className="size-2.5" />
              </span>
              {cfg.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
