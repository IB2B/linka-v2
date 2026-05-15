import { redirect } from "next/navigation";
import { fetchMe } from "@/lib/auth/me";

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await fetchMe();
  if (!user) redirect("/login");
  if (user.onboardingCompleted) redirect("/dashboard");
  return <>{children}</>;
}
