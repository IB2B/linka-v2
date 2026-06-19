import type { ReactNode } from "react";

// Mirrors the server's guardAdminTarget: admins can't be demoted, suspended,
// or deleted (nor can you act on yourself, and you're always an admin here),
// so we hide those actions and explain why instead of letting them 4xx.
export function ProtectedActions({ role, children }: { role: string; children: ReactNode }) {
  if (role !== "ADMIN") return <>{children}</>;
  return (
    <p className="px-2 py-1.5 text-xs leading-snug text-muted-foreground">
      Admin accounts can&apos;t be demoted, suspended, or deleted here.
    </p>
  );
}
