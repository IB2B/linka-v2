import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function LandingNav() {
  return (
    <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 pt-6">
      <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
        <span className="grid size-7 place-items-center rounded-lg bg-zinc-900 text-white">
          <Sparkles className="size-4" />
        </span>
        <span className="text-[15px]">linka</span>
      </Link>
      <div className="flex items-center gap-2">
        <Button render={<Link href="/login" />} nativeButton={false} variant="ghost" size="sm">
          Sign in
        </Button>
        <Button
          render={<Link href="/register" />}
          nativeButton={false}
          size="sm"
          className="rounded-full bg-zinc-900 px-4 hover:bg-zinc-800"
        >
          Get started
        </Button>
      </div>
    </header>
  );
}
