import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { HeaderActions } from "@/components/dashboard/header-actions";
import { NavBreadcrumb } from "@/components/dashboard/nav-breadcrumb";
import { redirect } from "next/navigation";
import { requireRole } from "@/lib/auth/require-role";
import type { DashboardUser } from "@/types/dashboard-user";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await requireRole("USER");
  if (!user.emailVerified) redirect("/verify-email");
  if (!user.onboardingCompleted) redirect("/onboarding");

  const dashboardUser: DashboardUser = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    avatarUrl: user.avatarUrl,
    role: user.role,
    tier: user.tier,
    postsUsed: user.postsUsed,
    postsLimit: user.postsLimit,
    features: user.features,
  };

  return (
    <SidebarProvider className="h-svh overflow-hidden">
      <AppSidebar user={dashboardUser} />
      <SidebarInset className="min-h-0 overflow-hidden">
        <header className="flex h-14 shrink-0 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <SidebarTrigger />
          <div className="h-4 w-px bg-border" aria-hidden />
          <NavBreadcrumb />
          <HeaderActions
            prefix="/dashboard"
            role={user.role}
            tier={user.tier}
            features={user.features}
          />
        </header>
        <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
