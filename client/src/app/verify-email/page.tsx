import { fetchMe } from "@/lib/auth/me";
import { AuthShowcase } from "@/components/auth/auth-showcase";
import { AuthSplitLayout } from "@/components/auth/auth-split-layout";
import { VerifyEmailPanel } from "@/components/auth/verify-email-panel";

export default async function VerifyEmailPage() {
  const user = await fetchMe();
  return (
    <AuthSplitLayout showcase={<AuthShowcase />}>
      <VerifyEmailPanel email={user?.email ?? ""} />
    </AuthSplitLayout>
  );
}
