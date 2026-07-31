// ISO 639-1 code to display name. Everything on our side stores the code; models
// and third-party catalogues both want the name — "write it in Italian" is a
// clearer instruction than 'language code "it"', and HeyGen filters voices by
// display name.
const NAMES: Record<string, string> = {
  en: "English", it: "Italian", fr: "French", de: "German", es: "Spanish",
  pt: "Portuguese", nl: "Dutch", pl: "Polish", sv: "Swedish", da: "Danish",
  no: "Norwegian", fi: "Finnish", cs: "Czech", ro: "Romanian", el: "Greek",
  tr: "Turkish", ru: "Russian", uk: "Ukrainian", ar: "Arabic", he: "Hebrew",
  hi: "Hindi", ja: "Japanese", ko: "Korean", zh: "Chinese",
  id: "Indonesian", vi: "Vietnamese",
};

// Accepts "it" or "it-IT". Unknown codes return null so the caller can fall back
// rather than pass on a name nothing will match.
export function languageNameFor(language?: string | null): string | null {
  const code = (language ?? "").trim().toLowerCase().split("-")[0];
  return code ? NAMES[code] ?? null : null;
}
