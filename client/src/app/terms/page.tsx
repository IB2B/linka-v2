import type { Metadata } from "next";

import { LandingBg } from "@/components/landing/landing-bg";
import { LandingNav } from "@/components/landing/landing-nav";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LegalDocument } from "@/components/legal/legal-document";
import { TERMS } from "@/components/legal/terms-data";

export const metadata: Metadata = {
  title: "Terms of Use — linka.studio",
  description: "The terms that govern your access to and use of linka.studio.",
};

export default function TermsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#FAFAFA] font-sans text-[#0F1113]">
      <LandingBg />
      <LandingNav />
      <LegalDocument {...TERMS} />
      <LandingFooter />
    </div>
  );
}
