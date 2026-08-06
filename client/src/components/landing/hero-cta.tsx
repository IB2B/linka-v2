import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { Button } from "@/components/ui/button";

export async function HeroCta() {
  const t = await getTranslations("landing.hero");
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
      <Button render={<Link href="/register" />} nativeButton={false} size="lg">
        {t("ctaPrimary")}
      </Button>
      <Button
        render={<Link href="#pricing" />}
        nativeButton={false}
        size="lg"
        variant="outline"
      >
        {t("ctaSecondary")}
      </Button>
    </div>
  );
}
