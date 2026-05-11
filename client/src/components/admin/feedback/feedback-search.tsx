"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

export function FeedbackSearch() {
  const router = useRouter();
  const params = useSearchParams();
  const initial = params.get("q") ?? "";

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const q = String(fd.get("q") ?? "").trim();
    const next = new URLSearchParams(params);
    if (q) next.set("q", q); else next.delete("q");
    router.replace(next.size ? `/admin/feedback?${next}` : "/admin/feedback");
  }

  return (
    <form onSubmit={onSubmit} className="relative w-full max-w-sm">
      <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        name="q"
        defaultValue={initial}
        placeholder="Search message or user email"
        className="pl-9"
      />
    </form>
  );
}
