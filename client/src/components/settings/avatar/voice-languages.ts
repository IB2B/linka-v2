import { LANGUAGES } from "@/lib/content/languages";

// The sentinel the voices endpoint understands as "do not filter". Exported so
// the picker, the hook and the option list all agree on one spelling.
export const ALL_LANGUAGES = "all";

// Built from the same list the post generator uses, so the language you write
// in and the language you can be heard in never drift apart.
export const VOICE_LANGUAGES = [
  { value: ALL_LANGUAGES, label: "All languages" },
  ...LANGUAGES,
];
