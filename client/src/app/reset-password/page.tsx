import Link from "next/link";
import { AuthShowcase } from "@/components/auth/auth-showcase";
import { AuthSplitLayout } from "@/components/auth/auth-split-layout";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

type Props = { searchParams: Promise<{ token?: string }> };

export default async function ResetPasswordPage({ searchParams }: Props) {
  const { token } = await searchParams;
  const valid = typeof token === "string" && /^[a-f0-9]{64}$/i.test(token);

  return (
    <AuthSplitLayout showcase={<AuthShowcase />}>
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Set a new password</h1>
        <p className="text-sm text-muted-foreground">
          {valid
            ? "Pick a fresh password to finish resetting your account."
            : "This reset link is missing or invalid. Request a new one from the forgot-password page."}
        </p>
      </div>
      <div className="mt-8">
        {valid ? (
          <ResetPasswordForm token={token!} />
        ) : (
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-foreground hover:underline"
          >
            Request a new reset link →
          </Link>
        )}
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        Remembered it?{" "}
        <Link href="/login" className="font-medium text-foreground hover:underline">
          Back to sign in
        </Link>
      </p>
    </AuthSplitLayout>
  );
}
