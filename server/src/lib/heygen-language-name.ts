// HeyGen filters its voice catalogue by language *display name* ("Italian"),
// while everything on our side speaks ISO 639-1 ("it"). Separate from
// heygen-locale, which answers a different question: that one decides how a
// voice pronounces, this one decides which voices are listed at all.
const NAMES: Record<string, string> = {
  en: "English", it: "Italian", fr: "French", de: "German", es: "Spanish",
  pt: "Portuguese", nl: "Dutch", pl: "Polish", sv: "Swedish", da: "Danish",
  no: "Norwegian", fi: "Finnish", cs: "Czech", ro: "Romanian", el: "Greek",
  tr: "Turkish", ru: "Russian", uk: "Ukrainian", ar: "Arabic", he: "Hebrew",
  hi: "Hindi", ja: "Japanese", ko: "Korean", zh: "Chinese",
  id: "Indonesian", vi: "Vietnamese",
};

// Accepts "it" or "it-IT". Unknown codes return null so the caller omits the
// filter rather than sending a name HeyGen will match nothing against.
export function languageNameFor(language?: string | null): string | null {
  const code = (language ?? "").trim().toLowerCase().split("-")[0];
  return code ? NAMES[code] ?? null : null;
}
