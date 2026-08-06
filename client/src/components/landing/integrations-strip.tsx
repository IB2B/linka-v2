import { getTranslations } from "next-intl/server";

import { Card } from "@/components/ui/card";
import { SectionHeading } from "./section-heading";
import { BrandIcon } from "./brand-icon";
import { INTEGRATIONS } from "./integrations-data";

export async function IntegrationsStrip() {
  const t = await getTranslations("landing.integrations");
  const roles: Record<string, string> = {
    text: t("roles.text"),
    image: t("roles.image"),
    video: t("roles.video"),
    trends: t("roles.trends"),
    billing: t("roles.billing"),
    infra: t("roles.infra"),
  };
  return (
    <section className="relative z-10 mx-auto w-full max-w-5xl px-6 py-20">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} align="center" />
      <div className="mx-auto mt-9 grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
        {INTEGRATIONS.map((i) => (
          <Card
            key={i.name}
            size="sm"
            className="items-center gap-1 bg-white py-4 text-[#0F1113] ring-[#E5E5E5] transition hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-12px_rgba(15,17,19,0.12)]"
          >
            <span
              aria-hidden
              className="flex size-10 items-center justify-center rounded-xl"
              style={{ background: i.bg, color: i.fg }}
            >
              <BrandIcon id={i.id} label={i.name} className="size-5" />
            </span>
            <span className="text-[12px] font-medium tracking-tight text-[#0F1113]">
              {i.name}
            </span>
            <span className="text-[10.5px] tracking-tight text-[#A3A3A3]">
              {roles[i.role]}
            </span>
          </Card>
        ))}
      </div>
    </section>
  );
}
