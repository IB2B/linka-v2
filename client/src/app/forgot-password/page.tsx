import Link from "next/link";

import { AuthShowcase } from "@/components/auth/auth-showcase";
import { AuthSplitLayout } from "@/components/auth/auth-split-layout";
import { ForgotPasswordPanel } from "@/components/auth/forgot-password-panel";

export default function ForgotPasswordPage() {
  return (
    <AuthSplitLayout showcase={<AuthShowcase />}>
      <ForgotPasswordPanel />
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Remembered it?{" "}
        <Link
          href="/login"
          className="font-medium text-foreground hover:underline"
        >
          Back to sign in
        </Link>
      </p>
    </AuthSplitLayout>
  );
}
