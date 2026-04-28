import Link from "next/link";

export function SidebarBrand() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 px-2 py-1.5 text-sm font-semibold tracking-tight"
    >
      <span className="size-6 rounded-md bg-foreground" aria-hidden />
      <span>linka</span>
    </Link>
  );
}
