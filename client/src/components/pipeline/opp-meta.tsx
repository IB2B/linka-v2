import { Calendar, Clock, AtSign, Banknote, CalendarClock, Mail, Phone, Building2 } from "lucide-react";
import type { Opportunity } from "@/types/pipeline";
import { formatMoney } from "./format-money";

function fmt(d: string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}

function Cell({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <div className="min-w-0">
        <p className="text-muted-foreground">{label}</p>
        <p className="truncate font-medium">{value}</p>
      </div>
    </div>
  );
}

export function OppMeta({ opp }: { opp: Opportunity }) {
  const value = formatMoney(opp.valueAmount, opp.valueCurrency);
  return (
    <div className="grid grid-cols-2 gap-3 rounded-xl border bg-card px-4 py-3 text-xs">
      <Cell icon={<Banknote className="size-3.5 text-muted-foreground" />} label="Deal value" value={value ?? "—"} />
      <Cell icon={<CalendarClock className="size-3.5 text-muted-foreground" />} label="Expected close" value={fmt(opp.expectedClose)} />
      <Cell icon={<Calendar className="size-3.5 text-muted-foreground" />} label="Added" value={fmt(opp.createdAt)} />
      <Cell icon={<Clock className="size-3.5 text-muted-foreground" />} label="Last activity" value={fmt(opp.lastActivityAt)} />
      {opp.companyName ? (
        <Cell icon={<Building2 className="size-3.5 text-muted-foreground" />} label="Company" value={opp.companyName} />
      ) : null}
      {opp.contactEmail ? (
        <a href={`mailto:${opp.contactEmail}`}
          className="col-span-2 flex items-center gap-2 border-t pt-2 hover:text-foreground">
          <Mail className="size-3.5 text-muted-foreground" />
          <span className="truncate font-medium">{opp.contactEmail}</span>
        </a>
      ) : null}
      {opp.contactPhone ? (
        <a href={`tel:${opp.contactPhone}`}
          className="col-span-2 flex items-center gap-2 border-t pt-2 hover:text-foreground">
          <Phone className="size-3.5 text-muted-foreground" />
          <span className="truncate font-medium">{opp.contactPhone}</span>
        </a>
      ) : null}
      {opp.contactHandle ? (
        <div className="col-span-2 flex items-center gap-2 border-t pt-2">
          <AtSign className="size-3.5 text-muted-foreground" />
          <p className="truncate font-medium">{opp.contactHandle}</p>
        </div>
      ) : null}
    </div>
  );
}
