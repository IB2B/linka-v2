"use client";

import { useTranslations } from "next-intl";

import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { ComposeForm } from "./compose-form";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPosted: () => void;
  onScheduleDraft: (id: string) => void;
};

export function ComposeDialog({ open, onOpenChange, onPosted, onScheduleDraft }: Props) {
  const t = useTranslations("posts.compose");
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col gap-0 p-0 sm:max-w-lg">
        <DialogHeader className="border-b px-4 py-3">
          <DialogTitle className="text-base">{t("title")}</DialogTitle>
        </DialogHeader>
        <ComposeForm onPosted={onPosted} onScheduleDraft={onScheduleDraft} />
      </DialogContent>
    </Dialog>
  );
}
