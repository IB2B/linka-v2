import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";

export function SidebarBrand() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 px-2 py-1.5 text-[15px] font-semibold tracking-tight"
    >
      <BrandLogo size={28} />
      <span>
        linka<span className="text-muted-foreground">.studio</span>
      </span>
    </Link>
  );
}
