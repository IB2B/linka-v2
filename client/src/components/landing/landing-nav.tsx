import Link from "next/link";
import { Button } from "@/components/ui/button";

const links = [
  { href: "#features", label: "Features" },
  { href: "#process", label: "Process" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function LandingNav() {
  return (
    <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 pt-7">
      <Link href="/" className="flex items-center gap-2.5">
        <span className="size-2 rounded-full bg-[#6D5FF9]" />
        <span className="text-[14px] font-medium tracking-tight text-[#0F1113]">
          linka<span className="text-[#737373]">.studio</span>
        </span>
      </Link>
      <nav className="hidden items-center gap-8 md:flex">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="font-mono text-[12px] uppercase tracking-[0.14em] text-[#737373] transition hover:text-[#0F1113]"
          >
            {l.label}
          </a>
        ))}
      </nav>
      <Button
        render={<Link href="/register" />}
        nativeButton={false}
        size="sm"
        className="rounded-full bg-[#0F1113] px-4 text-[13px] font-medium text-white hover:bg-[#0F1113]/90"
      >
        Book intro call
      </Button>
    </header>
  );
}
