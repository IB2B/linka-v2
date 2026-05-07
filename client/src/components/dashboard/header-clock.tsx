"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

import { loadTimezone } from "@/lib/preferences/timezone";

function formatTime(tz: string, now: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit", minute: "2-digit", hour12: false, timeZone: tz,
  }).format(now);
}

function formatLabel(tz: string): string {
  return tz.split("/").pop()?.replace(/_/g, " ") ?? tz;
}

export function HeaderClock() {
  const [tz, setTz] = useState<string>("UTC");
  const [now, setNow] = useState<Date>(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTz(loadTimezone());
    setMounted(true);
    const tick = setInterval(() => setNow(new Date()), 30_000);
    function onChange(e: Event) {
      const detail = (e as CustomEvent<string>).detail;
      if (detail) setTz(detail);
    }
    window.addEventListener("linka:tz-change", onChange);
    return () => {
      clearInterval(tick);
      window.removeEventListener("linka:tz-change", onChange);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="hidden h-7 items-center gap-1.5 rounded-md border bg-muted/40 px-2 text-xs font-medium text-muted-foreground md:inline-flex"
      title={tz}
    >
      <Clock className="size-3.5" />
      <span className="tabular-nums text-foreground">{formatTime(tz, now)}</span>
      <span className="text-muted-foreground">· {formatLabel(tz)}</span>
    </div>
  );
}
