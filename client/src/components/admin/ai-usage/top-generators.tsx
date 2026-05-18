import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { InboxAvatar } from "@/components/inbox/inbox-avatar";
import {
  calcTotalCost as cost, formatTokenCount as fmtK,
} from "@/lib/admin/token-cost";
import type { TopGenerator } from "@/types/admin-ai-usage";

const fmt = new Intl.NumberFormat("en-US");
const fmtCost = (n: number) => n === 0 ? "—" : n < 0.001 ? "<$0.001" : `$${n.toFixed(n < 0.1 ? 3 : 2)}`;

export function TopGenerators({ users }: { users: TopGenerator[] }) {
  return (
    <Card size="sm" className="gap-0 p-0">
      <div className="flex items-center justify-between border-b px-5 py-3">
        <div className="flex items-center gap-2">
          <Sparkles className="size-3.5 text-muted-foreground" />
          <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Top generators
          </h3>
        </div>
        <Link
          href="/admin/users"
          className="inline-flex items-center gap-1 text-xs font-medium tracking-tight text-muted-foreground hover:text-foreground"
        >
          All users <ArrowRight className="size-3" />
        </Link>
      </div>
      {users.length === 0 ? (
        <div className="px-5 py-10 text-center text-sm tracking-tight text-muted-foreground">
          No AI activity in this range.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-x-4 border-b px-4 py-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            <span className="col-span-2">User</span>
            <span className="text-right">Drafts</span>
            <span className="text-right">Tokens</span>
            <span className="text-right">Cost</span>
          </div>
          <ul className="divide-y">
            {users.map((u, i) => {
              const name = `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim() || u.email;
              const totalTok = u.tokensInput + u.tokensOutput;
              const userCost = cost(u.tokensInput, u.tokensOutput, u.images);
              return (
                <li key={u.id} className="grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-x-4 px-4 py-3">
                  <span className="grid size-5 shrink-0 place-items-center rounded-md bg-muted text-[11px] font-medium tabular-nums text-muted-foreground">
                    {i + 1}
                  </span>
                  <div className="flex min-w-0 items-center gap-2">
                    <InboxAvatar name={name} src={u.avatarUrl} />
                    <div className="min-w-0">
                      <Link
                        href={`/admin/users/${u.id}`}
                        className="inline-flex items-center gap-1 truncate text-sm font-medium tracking-tight hover:underline"
                      >
                        {name} <ArrowUpRight className="size-3 shrink-0 text-muted-foreground" />
                      </Link>
                      <div className="truncate text-xs tracking-tight text-muted-foreground">
                        {fmt.format(u.images)} images
                      </div>
                    </div>
                  </div>
                  <span className="text-right text-sm font-medium tabular-nums tracking-tight">{fmt.format(u.drafts)}</span>
                  <span className="text-right text-sm tabular-nums tracking-tight text-muted-foreground">{fmtK(totalTok)}</span>
                  <span className="text-right text-sm font-medium tabular-nums tracking-tight text-emerald-600 dark:text-emerald-400">{userCost === 0 ? "$0.00" : fmtCost(userCost)}</span>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </Card>
  );
}
