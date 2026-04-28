import { requireRole } from "@/lib/auth/require-role";

export default async function SuperAdminDashboardPage() {
  const { user } = await requireRole("SUPER_ADMIN");

  return (
    <div className="flex flex-1 flex-col gap-2 p-10">
      <h1 className="text-3xl font-semibold">Super admin dashboard</h1>
      <p className="text-sm text-muted-foreground">
        Signed in as {user.email}.
      </p>
    </div>
  );
}
