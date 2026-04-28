"use client";

import { useEffect, useState } from "react";
import { NotificationRow } from "./notification-row";

const PREFS = [
  { id: "notif_published", label: "Post published", description: "When a scheduled post goes live." },
  { id: "notif_failed", label: "Post failed", description: "When a post fails so you can retry." },
  { id: "notif_limit", label: "Post limit warnings", description: "At 80% and 100% of your monthly limit." },
  { id: "notif_digest", label: "Weekly digest", description: "A weekly summary of your activity and stats." },
  { id: "notif_updates", label: "Product updates", description: "New features, improvements, and tips." },
  { id: "notif_marketing", label: "Promotions", description: "Discounts, promos, and launch announcements." },
] as const;

type PrefId = (typeof PREFS)[number]["id"];
type State = Record<PrefId, boolean>;

const DEFAULT: State = {
  notif_published: true,
  notif_failed: true,
  notif_limit: true,
  notif_digest: false,
  notif_updates: false,
  notif_marketing: false,
};

export function NotificationsForm() {
  const [prefs, setPrefs] = useState<State>(DEFAULT);

  useEffect(() => {
    const saved = localStorage.getItem("notif_prefs");
    if (saved) setPrefs(JSON.parse(saved) as State);
  }, []);

  function toggle(id: PrefId, value: boolean) {
    const next = { ...prefs, [id]: value };
    setPrefs(next);
    localStorage.setItem("notif_prefs", JSON.stringify(next));
  }

  return (
    <div className="divide-y divide-border">
      {PREFS.map((pref) => (
        <NotificationRow
          key={pref.id}
          id={pref.id}
          label={pref.label}
          description={pref.description}
          checked={prefs[pref.id]}
          onChange={(v) => toggle(pref.id, v)}
        />
      ))}
    </div>
  );
}
