import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { Button } from "@/components/ui/button";
import { ROLE_REDIRECTS } from "@/lib/auth/constants";
import { fetchMe } from "@/lib/auth/me";
import { LandingLanguageSwitch } from "./landing-language-switch";

export async function LandingNavActions() {
  const [t, user] = await Promise.all([
    getTranslations("landing.nav"),
    fetchMe(),
  ]);

  return (
    <div className="flex items-center gap-3 justify-self-end">
      <LandingLanguageSwitch />
      {user ? (
        <Button render={<Link href={ROLE_REDIRECTS[user.role]} />} nativeButton={false}>
          {t("dashboard")}
        </Button>
      ) : (
        <>
          <Link
            href="/login"
            className="hidden text-[14px] tracking-tight text-[#0F1113] transition hover:text-[#525252] sm:inline"
          >
            {t("signIn")}
          </Link>
          <Button render={<Link href="/register" />} nativeButton={false}>
            {t("getStarted")}
          </Button>
        </>
      )}
    </div>
  );
}
