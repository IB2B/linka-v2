"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { loginRequest } from "@/lib/api/auth-client";
import { ROLE_REDIRECTS } from "@/lib/auth/constants";
import { FormField } from "@/components/forms/form-field";
import { FormSubmitButton } from "@/components/forms/form-submit-button";
import { PasswordField } from "@/components/forms/password-field";

export function LoginForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    const formData = new FormData(event.currentTarget);
    const payload = {
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    };

    setPending(true);
    const result = await loginRequest(payload);
    setPending(false);

    if (!result.ok) {
      toast.error(result.error);
      return;
    }

    router.push(ROLE_REDIRECTS[result.data.role]);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField
        id="email"
        name="email"
        type="email"
        label="Email"
        autoComplete="email"
        placeholder="you@example.com"
        required
      />
      <PasswordField
        id="password"
        name="password"
        label="Password"
        autoComplete="current-password"
        required
        labelAction={
          <Link
            href="/forgot-password"
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Forgot password?
          </Link>
        }
      />
      <FormSubmitButton label="Sign in" pending={pending} />
    </form>
  );
}
