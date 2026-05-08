export const REASON_LABEL: Record<string, string> = {
  spam: "Spam",
  harassment: "Harassment",
  hate: "Hate speech",
  misinformation: "Misinformation",
  sexual: "Sexual content",
  violence: "Violence",
  other: "Other",
};

export const REASON_BG: Record<string, string> = {
  spam: "bg-sky-500",
  harassment: "bg-rose-500",
  hate: "bg-rose-600",
  misinformation: "bg-amber-500",
  sexual: "bg-fuchsia-500",
  violence: "bg-orange-600",
  other: "bg-muted-foreground/50",
};

export const REASON_TONE: Record<string, string> = {
  spam:           "border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-400",
  harassment:     "border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-400",
  hate:           "border-rose-600/40 bg-rose-600/10 text-rose-700 dark:text-rose-400",
  misinformation: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  sexual:         "border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-700 dark:text-fuchsia-400",
  violence:       "border-orange-600/30 bg-orange-600/10 text-orange-700 dark:text-orange-400",
  other:          "border-muted-foreground/30 bg-muted text-muted-foreground",
};
