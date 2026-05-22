import { getTranslations } from "next-intl/server";

export async function HeroBadge() {
  const t = await getTranslations("landing.hero");
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[#E5E5E5] bg-white px-3 py-1.5 text-[12.5px] tracking-tight text-[#525252] shadow-[0_1px_0_rgba(15,17,19,0.03)]">
      <span className="size-1.5 rounded-full bg-[#0F1113]" />
      <span>{t("badge")}</span>
      <a
        href="#features"
        className="font-medium text-[#3B82F6] transition hover:text-[#2563EB]"
      >
        {t("badgeLink")}
      </a>
    </div>
  );
}
