import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";

export function SidebarBrand() {
  return (
    <Link
      href="/"
      aria-label="linka.studio"
      className="flex items-center gap-2 px-2 py-1.5 text-[15px] font-semibold tracking-tight group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:px-0"
    >
      <BrandLogo size={32} />
      <span className="group-data-[collapsible=icon]:hidden">
        linka<span className="text-muted-foreground">.studio</span>
      </span>
    </Link>
  );
}
