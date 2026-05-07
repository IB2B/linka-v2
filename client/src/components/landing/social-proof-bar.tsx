const brands = ["Notion", "Vercel", "Linear", "Framer", "Loom", "Stripe"];

export function SocialProofBar() {
  return (
    <section className="relative z-10 mx-auto w-full max-w-7xl border-y border-[#E5E5E5] px-6 py-10">
      <div className="flex flex-col items-center gap-7 md:flex-row md:justify-between">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#737373]">
          Used by teams shipping at
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {brands.map((b) => (
            <span
              key={b}
              className="text-[18px] font-medium tracking-tight text-[#A3A3A3] transition hover:text-[#0F1113]"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
