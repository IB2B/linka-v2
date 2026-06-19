"use client";

import { useLogout } from "@/hooks/use-logout";
import { Spinner } from "@/components/ui/spinner";
import { ThemeToggleButton } from "@/components/theme/theme-toggle-button";

export function OnboardingHeaderNav({ email }: { email: string }) {
  const { logout, pending } = useLogout();
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="hidden text-muted-foreground sm:inline">{email}</span>
      <ThemeToggleButton />
      <button
        onClick={logout}
        disabled={pending}
        className="font-medium hover:underline disabled:opacity-50"
      >
        {pending ? <Spinner size="xs" /> : "Log out"}
      </button>
    </div>
  );
}
