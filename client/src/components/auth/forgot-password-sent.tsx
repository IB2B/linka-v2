import { MailCheck } from "lucide-react";

export function ForgotPasswordSent({ email }: { email: string }) {
  return (
    <div className="space-y-4">
      <div className="flex size-12 items-center justify-center rounded-full bg-muted">
        <MailCheck className="size-6 text-foreground" aria-hidden />
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Check your inbox</h2>
        <p className="text-sm text-muted-foreground">
          If an account exists for{" "}
          <span className="font-medium text-foreground">{email}</span>, we sent
          a link to reset your password. The link expires in 30 minutes.
        </p>
      </div>
      <p className="text-xs text-muted-foreground">
        Didn&apos;t get it? Check your spam folder, or try again in a few
        minutes.
      </p>
    </div>
  );
}
