export type Language = {
  value: string;
  label: string;
};

// Labelled in the language's own name so a native speaker recognises it at a
// glance. value = ISO 639-1 code passed through to the model.
export const LANGUAGES: Language[] = [
  { value: "en", label: "English" },
  { value: "es", label: "Español (Spanish)" },
  { value: "fr", label: "Français (French)" },
  { value: "de", label: "Deutsch (German)" },
  { value: "it", label: "Italiano (Italian)" },
  { value: "pt", label: "Português (Portuguese)" },
  { value: "nl", label: "Nederlands (Dutch)" },
  { value: "pl", label: "Polski (Polish)" },
  { value: "sv", label: "Svenska (Swedish)" },
  { value: "da", label: "Dansk (Danish)" },
  { value: "no", label: "Norsk (Norwegian)" },
  { value: "fi", label: "Suomi (Finnish)" },
  { value: "cs", label: "Čeština (Czech)" },
  { value: "ro", label: "Română (Romanian)" },
  { value: "el", label: "Ελληνικά (Greek)" },
  { value: "tr", label: "Türkçe (Turkish)" },
  { value: "ru", label: "Русский (Russian)" },
  { value: "uk", label: "Українська (Ukrainian)" },
  { value: "ar", label: "العربية (Arabic)" },
  { value: "hi", label: "हिन्दी (Hindi)" },
  { value: "ja", label: "日本語 (Japanese)" },
  { value: "ko", label: "한국어 (Korean)" },
  { value: "zh", label: "中文 (Chinese)" },
];
