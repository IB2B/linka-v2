import { Badge } from "@/components/ui/badge";
import type { AdminUserDetail } from "@/types/admin";

function fmtDate(s: string | null): string {
  if (!s) return "—";
  return new Date(s).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function UserDetailMeta({ detail }: { detail: AdminUserDetail }) {
  const { profile, subscription, platforms } = detail;
  const rows: { label: string; value: React.ReactNode }[] = [
    { label: "Industry", value: profile.industry || "—" },
    { label: "Bio", value: profile.bio || "—" },
    { label: "Plan", value: subscription ? `${subscription.planTier} · ${subscription.status}` : "free" },
    { label: "Renews", value: fmtDate(subscription?.currentPeriodEnd ?? null) },
    {
      label: "Platforms",
      value: platforms.length ? (
        <div className="flex flex-wrap gap-1">
          {platforms.map((p) => (
            <Badge key={p} variant="outline" className="capitalize">{p}</Badge>
          ))}
        </div>
      ) : "—",
    },
  ];
  return (
    <dl className="grid grid-cols-[120px_1fr] gap-x-4 gap-y-3 text-sm">
      {rows.map((r) => (
        <div key={r.label} className="contents">
          <dt className="tracking-tight text-muted-foreground">{r.label}</dt>
          <dd className="tracking-tight">{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}
