"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { NotificationRow } from "./notification-row";
import { NOTIF_PREFS, type NotifPrefId, type NotifPrefs } from "./notification-prefs.types";

const DEFAULT: NotifPrefs = {
  notifGenerated: true,
  notifPublished: true,
  notifFailed: true,
  notifLimit: true,
};

export function NotificationsForm() {
  const [prefs, setPrefs] = useState<NotifPrefs>(DEFAULT);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/users/me/notification-prefs", { cache: "no-store" })
      .then((r) => r.ok ? r.json() : DEFAULT)
      .then((d: NotifPrefs) => { setPrefs(d); setLoaded(true); })
      .catch(() => setLoaded(true));
  }, []);

  async function toggle(id: NotifPrefId, value: boolean) {
    const prev = prefs[id];
    setPrefs((p) => ({ ...p, [id]: value }));
    try {
      const r = await fetch("/api/users/me/notification-prefs", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [id]: value }),
      });
      if (!r.ok) throw new Error("save failed");
    } catch {
      setPrefs((p) => ({ ...p, [id]: prev }));
      toast.error("Couldn't save preference.");
    }
  }

  return (
    <div className="divide-y divide-border">
      {NOTIF_PREFS.map((p) => (
        <NotificationRow
          key={p.id} id={p.id} label={p.label} description={p.description}
          checked={prefs[p.id]} disabled={!loaded}
          onChange={(v) => toggle(p.id, v)}
        />
      ))}
    </div>
  );
}
