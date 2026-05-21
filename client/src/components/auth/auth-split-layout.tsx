import type { AuthSplitLayoutProps } from "@/types/auth-split-layout-props";

export function AuthSplitLayout({ showcase, children }: AuthSplitLayoutProps) {
  return (
    <div className="grid min-h-svh flex-1 lg:grid-cols-2">
      <div className="relative hidden flex-col overflow-hidden bg-[#f4f4f5] p-10 font-display text-zinc-900 lg:flex">
        {showcase}
      </div>
      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
}
