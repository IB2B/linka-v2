"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { UsageTone } from "@/lib/usage/usage-tone";

type Props = {
  tone: UsageTone;
  showUpgrade: boolean;
  onUpgrade: () => void;
  onClose: () => void;
};

// Tells the user what to do when a quota runs low, then links to billing.
export function UsagePanelFooter({ tone, showUpgrade, onUpgrade, onClose }: Props) {
  const t = useTranslations("dashboard.usagePill");
  return (
    <div className="space-y-3 border-t px-4 py-3">
      {tone !== "ok" ? (
        <p className={cn("text-xs", tone === "danger" ? "text-destructive" : "text-yellow-600 dark:text-yellow-500")}>
          {t(tone)}
        </p>
      ) : null}
      <div className="flex items-center justify-end gap-2">
        <Button variant="ghost" size="sm" nativeButton={false} onClick={onClose}
          render={<Link href="/dashboard/billing" />}>
          {t("manage")}
        </Button>
        {showUpgrade ? (
          <Button size="sm" onClick={onUpgrade}>{t("upgrade")}</Button>
        ) : null}
      </div>
    </div>
  );
}
