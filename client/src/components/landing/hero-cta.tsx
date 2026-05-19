import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Button } from "@/components/ui/button";

export async function HeroCta() {
  const t = await getTranslations("landing.hero");
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button
        render={<Link href="/register" />}
        nativeButton={false}
        size="lg"
        className="tracking-tight"
      >
        {t("ctaPrimary")} <ArrowUpRight />
      </Button>
      <Button
        render={<Link href="#pricing" />}
        nativeButton={false}
        size="lg"
        variant="outline"
        className="tracking-tight"
      >
        {t("ctaSecondary")}
      </Button>
    </div>
  );
}
