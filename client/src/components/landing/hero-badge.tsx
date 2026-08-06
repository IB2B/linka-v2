import { getTranslations } from "next-intl/server";

export async function HeroBadge() {
  const t = await getTranslations("landing.hero");
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[#EAEBEF] bg-white px-3 py-1.5 text-[12.5px] tracking-tight text-[#525252] shadow-[0_2px_6px_-2px_rgba(15,17,19,0.06)]">
      <span className="size-1.5 rounded-full bg-[#6D5FF9]" />
      <span>{t("badge")}</span>
      <a
        href="#features"
        className="font-medium text-[#0F1113] underline decoration-[#0F1113]/20 underline-offset-2 transition hover:decoration-[#0F1113]"
      >
        {t("badgeLink")}
      </a>
    </div>
  );
}
