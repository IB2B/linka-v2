"use client";

import { useMemo, useState } from "react";
import { PLATFORMS } from "@/lib/zernio/platforms";
import { AccountCard } from "./account-card";
import { AccountsFilters } from "./accounts-filters";
import type { AccountFilter } from "./account-filter-tabs";
import type { ZernioAccount } from "@/lib/zernio/zernio-account.types";

type Props = { accounts: ZernioAccount[] };

export function AccountGrid({ accounts }: Props) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<AccountFilter>("all");

  const counts = useMemo(() => {
    const connected = accounts.filter((a) => a.connected).length;
    return { all: accounts.length, connected, available: accounts.length - connected };
  }, [accounts]);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return accounts.filter((a) => {
      if (filter === "connected" && !a.connected) return false;
      if (filter === "available" && a.connected) return false;
      if (!q) return true;
      const meta = PLATFORMS.find((p) => p.slug === a.platform)!;
      return meta.label.toLowerCase().includes(q);
    });
  }, [accounts, search, filter]);

  return (
    <div className="flex w-full flex-col gap-4">
      <AccountsFilters
        search={search}
        onSearch={setSearch}
        filter={filter}
        onFilter={setFilter}
        counts={counts}
      />
      <div className="flex flex-col gap-2">
        {visible.map((a) => (
          <AccountCard key={a.platform} account={a} />
        ))}
        {visible.length === 0 && (
          <p className="rounded-xl border border-dashed bg-card p-8 text-center text-sm text-muted-foreground">
            No platforms match your search.
          </p>
        )}
      </div>
    </div>
  );
}
