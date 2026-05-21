"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

export function SupportSearch() {
  const router = useRouter();
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = q.trim();
    const next = new URLSearchParams(params);
    if (trimmed) next.set("q", trimmed); else next.delete("q");
    router.replace(next.size ? `/admin/support?${next}` : "/admin/support");
  }

  return (
    <form onSubmit={onSubmit} className="relative w-full max-w-sm">
      <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        name="q"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search subject, body or user email"
        className="pl-9"
      />
    </form>
  );
}
