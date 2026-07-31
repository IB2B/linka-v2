// voice_settings.locale wants a full BCP-47 tag; user_profiles.preferred_language
// stores a bare two-letter code. Without the tag a multilingual voice reads
// foreign text with an English accent, which is the loudest flaw in a non-English
// video — the words are right and the mouth is right, but the speaker sounds
// like a tourist.
const LOCALES: Record<string, string> = {
  en: "en-US", it: "it-IT", fr: "fr-FR", de: "de-DE", es: "es-ES",
  pt: "pt-PT", nl: "nl-NL", pl: "pl-PL", sv: "sv-SE", da: "da-DK",
  no: "nb-NO", fi: "fi-FI", cs: "cs-CZ", ro: "ro-RO", el: "el-GR",
  tr: "tr-TR", ru: "ru-RU", uk: "uk-UA", ar: "ar-SA", he: "he-IL", hi: "hi-IN",
  ja: "ja-JP", ko: "ko-KR", zh: "zh-CN", id: "id-ID", vi: "vi-VN",
};

// Already-qualified tags ("pt-BR", "en-GB") pass through untouched. An unknown
// code returns null so the field is omitted rather than sent as garbage.
export function localeFor(language?: string | null): string | null {
  const raw = (language ?? "").trim();
  if (!raw) return null;
  if (raw.includes("-")) return raw;
  return LOCALES[raw.toLowerCase()] ?? null;
}
