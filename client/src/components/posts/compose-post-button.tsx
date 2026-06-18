"use client";

import { Pencil } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { ComposePost } from "./compose-post";

export function ComposePostButton() {
  const t = useTranslations("posts.compose");
  return (
    <ComposePost>
      {(open) => (
        <Button size="sm" variant="outline" onClick={open}>
          <Pencil className="size-4" />
          {t("trigger")}
        </Button>
      )}
    </ComposePost>
  );
}
