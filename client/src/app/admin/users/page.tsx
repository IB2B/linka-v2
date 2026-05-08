import { PageHeader } from "@/components/dashboard/page-header";
import { AddUserDialog } from "@/components/admin/users/add-user-dialog";
import { UsersFilter } from "@/components/admin/users/users-filter";
import { UsersSearch } from "@/components/admin/users/users-search";
import { UsersTable } from "@/components/admin/users/users-table";
import { getAdminUsers } from "@/lib/admin/get-users";
import { filterFromParams } from "@/lib/admin/users-filters";

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ q?: string; role?: string; status?: string }> };

export default async function AdminUsersPage({ searchParams }: Props) {
  const sp = await searchParams;
  const { users, total } = await getAdminUsers(sp);
  return (
    <>
      <PageHeader
        title="Users"
        description={`${total.toLocaleString()} ${total === 1 ? "user" : "users"} matching the current filter.`}
      />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-1 items-center gap-2">
          <UsersSearch />
          <UsersFilter active={filterFromParams(sp)} q={sp.q} />
        </div>
        <AddUserDialog />
      </div>
      <UsersTable users={users} />
    </>
  );
}
