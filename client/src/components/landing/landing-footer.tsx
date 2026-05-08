import Link from "next/link";

const cols = [
  { title: "Product", links: ["Features", "Pricing", "Changelog", "Roadmap"] },
  { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
  { title: "Legal", links: ["Terms", "Privacy", "Security", "DPA"] },
];

export function LandingFooter() {
  return (
    <footer className="relative z-10 border-t border-[#E5E5E5]">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-14 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div className="flex flex-col gap-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#6D5FF9]" />
            <span className="text-sm font-semibold tracking-tight text-[#0F1113]">
              linka<span className="text-[#A3A3A3]">.studio</span>
            </span>
          </Link>
          <p className="max-w-xs text-[13px] leading-[1.6] tracking-tight text-[#737373]">
            AI-led social growth for founders who&rsquo;d rather ship than post.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title} className="flex flex-col gap-3">
            <h4 className="text-[12px] font-medium tracking-tight text-[#0F1113]">
              {c.title}
            </h4>
            {c.links.map((l) => (
              <a
                key={l}
                href="#"
                className="text-[13px] tracking-tight text-[#737373] transition hover:text-[#0F1113]"
              >
                {l}
              </a>
            ))}
          </div>
        ))}
      </div>
      <div className="border-t border-[#E5E5E5]">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-5 text-[12px] tracking-tight text-[#737373]">
          <span>© {new Date().getFullYear()} linka — all rights reserved</span>
          <span>
            Designed with <span className="text-[#6D5FF9]">♥</span> from somewhere on Earth
          </span>
        </div>
      </div>
    </footer>
  );
}
