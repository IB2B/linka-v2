export type NotifPrefId = "notifPublished" | "notifFailed" | "notifLimit";

export type NotifPrefs = Record<NotifPrefId, boolean>;

type Item = { id: NotifPrefId; label: string; description: string };

export const NOTIF_PREFS: readonly Item[] = [
  { id: "notifPublished", label: "Post published",
    description: "When a scheduled post goes live." },
  { id: "notifFailed", label: "Post failed",
    description: "When a post fails so you can retry." },
  { id: "notifLimit", label: "Post limit warnings",
    description: "At 80% and 100% of your monthly limit." },
];
