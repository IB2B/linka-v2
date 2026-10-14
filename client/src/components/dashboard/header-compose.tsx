"use client";

import Link from "next/link";
import { Plus, Sparkles, PenSquare } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ComposePost } from "@/components/posts/compose-post";

// Primary "New post" action in the top-right header: AI generate or write by hand.
export function HeaderCompose() {
  const t = useTranslations("posts.compose");
  const label = t("newPost");

  return (
    <ComposePost>
      {(open) => (
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button size="sm" aria-label={label} />}>
            <Plus />
            <span className="hidden sm:inline">{label}</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 rounded-lg" align="end" sideOffset={8}>
            <DropdownMenuGroup>
              <DropdownMenuItem render={<Link href="/dashboard/generate" />}>
                <Sparkles />
                {t("generateOption")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={open}>
                <PenSquare />
                {t("manualOption")}
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </ComposePost>
  );
}
