import { redirect } from "next/navigation";
import { fetchMe } from "@/lib/auth/me";
import { ROLE_REDIRECTS } from "@/lib/auth/constants";

export default async function VerifyEmailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await fetchMe();
  if (!user) redirect("/login");
  if (user.emailVerified) {
    if (!user.onboardingCompleted) redirect("/onboarding");
    redirect(ROLE_REDIRECTS[user.role]);
  }
  return <>{children}</>;
}
