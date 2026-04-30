import Link from "next/link";

import { AuthShowcase } from "@/components/auth/auth-showcase";
import { AuthSplitLayout } from "@/components/auth/auth-split-layout";
import { ForgotPasswordPanel } from "@/components/auth/forgot-password-panel";

export default function ForgotPasswordPage() {
  return (
    <AuthSplitLayout showcase={<AuthShowcase />}>
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Forgot password?</h1>
        <p className="text-sm text-muted-foreground">
          Enter the email tied to your account and we&apos;ll send you a link
          to reset it.
        </p>
      </div>
      <div className="mt-8">
        <ForgotPasswordPanel />
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
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
