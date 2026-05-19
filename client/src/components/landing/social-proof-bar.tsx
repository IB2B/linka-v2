import { getTranslations } from "next-intl/server";

const brands = ["Notion", "Vercel", "Linear", "Framer", "Loom", "Stripe"];

export async function SocialProofBar() {
  const t = await getTranslations("landing");
  return (
    <section className="relative z-10 mx-auto w-full max-w-5xl px-6 pt-4 pb-14">
      <p className="text-center text-[11px] font-medium uppercase tracking-[0.2em] text-[#A3A3A3]">
        {t("socialProof")}
      </p>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-x-2 gap-y-3">
        {brands.map((b, i) => (
          <span key={b} className="flex items-center">
            <span className="px-4 text-[17px] font-semibold tracking-tight text-[#A3A3A3] transition hover:text-[#0F1113]">
              {b}
            </span>
            {i < brands.length - 1 && (
              <span aria-hidden className="hidden h-3 w-px bg-[#E5E5E5] sm:block" />
            )}
          </span>
        ))}
      </div>
    </section>
  );
}
