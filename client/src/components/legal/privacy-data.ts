import type { LegalContent } from "./legal.types";
import { PRIVACY_CORE } from "./privacy-sections-core";
import { PRIVACY_RIGHTS } from "./privacy-sections-rights";

export const PRIVACY: LegalContent = {
  title: "Privacy Policy",
  lastUpdated: "June 1, 2026",
  intro:
    "This Privacy Policy explains what information linka.studio collects, how we use and protect it, and the rights you have over your data. By using the service, you agree to the practices described here.",
  sections: [...PRIVACY_CORE, ...PRIVACY_RIGHTS],
};
