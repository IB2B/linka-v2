import type { LegalContent } from "./legal.types";
import { TERMS_CORE } from "./terms-sections-core";
import { TERMS_LEGAL } from "./terms-sections-legal";

export const TERMS: LegalContent = {
  title: "Terms of Use",
  lastUpdated: "June 1, 2026",
  intro:
    "These Terms of Use govern your access to and use of linka.studio. Please read them carefully — by creating an account or using the service, you agree to be bound by them.",
  sections: [...TERMS_CORE, ...TERMS_LEGAL],
};
