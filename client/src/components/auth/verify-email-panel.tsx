import { VerifyEmailForm } from "./verify-email-form";
import { VerifyEmailResend } from "./verify-email-resend";

export function VerifyEmailPanel({ email }: { email: string }) {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Confirm your email</h1>
        <p className="text-sm text-muted-foreground">
          We sent a 6-digit code to{" "}
          <span className="font-medium text-foreground">{email}</span>. Enter
          it below to finish setting up your account.
        </p>
      </div>
      <VerifyEmailForm />
      <VerifyEmailResend />
    </div>
  );
}
