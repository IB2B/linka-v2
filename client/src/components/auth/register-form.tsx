"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { registerRequest } from "@/lib/api/auth-client";
import { ROLE_REDIRECTS } from "@/lib/auth/constants";
import { FormField } from "@/components/forms/form-field";
import { FormSubmitButton } from "@/components/forms/form-submit-button";
import { PasswordField } from "@/components/forms/password-field";
import { PasswordStrength } from "@/components/forms/password-strength";

export function RegisterForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [password, setPassword] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    const data = new FormData(event.currentTarget);
    const payload = {
      firstName: String(data.get("firstName") ?? ""),
      lastName: String(data.get("lastName") ?? ""),
      email: String(data.get("email") ?? ""),
      password: String(data.get("password") ?? ""),
      confirmPassword: String(data.get("confirmPassword") ?? ""),
    };

    setPending(true);
    const result = await registerRequest(payload);
    setPending(false);

    if (!result.ok) {
      toast.error(result.error);
      return;
    }

    if (result.data.emailConfirmationRequired) {
      toast.success("Check your email to confirm your account.");
      router.push("/login");
      return;
    }

    router.push(ROLE_REDIRECTS[result.data.role]);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField id="firstName" name="firstName" type="text" label="First name" autoComplete="given-name" required />
        <FormField id="lastName" name="lastName" type="text" label="Last name" autoComplete="family-name" required />
      </div>
      <FormField id="email" name="email" type="email" label="Email" autoComplete="email" placeholder="you@example.com" required />
      <PasswordField
        id="password" name="password" label="Password"
        autoComplete="new-password" required
        onInput={(e) => setPassword((e.currentTarget as HTMLInputElement).value)}
      />
      <PasswordStrength password={password} />
      <PasswordField id="confirmPassword" name="confirmPassword" label="Confirm password" autoComplete="new-password" required />
      <FormSubmitButton label="Create account" pending={pending} />
    </form>
  );
}
