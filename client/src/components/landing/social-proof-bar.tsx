const brands = ["Notion", "Vercel", "Linear", "Framer", "Loom", "Stripe"];

export function SocialProofBar() {
  return (
    <section className="relative z-10 mx-auto w-full max-w-6xl px-6 py-12">
      <p className="text-center text-[12px] font-medium tracking-tight text-[#737373]">
        Used by teams shipping at
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
        {brands.map((b) => (
          <span
            key={b}
            className="text-[17px] font-semibold tracking-tight text-[#A3A3A3] transition hover:text-[#0F1113]"
          >
            {b}
          </span>
        ))}
      </div>
    </section>
  );
}
