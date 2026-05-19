import { PageHeader } from "@/components/dashboard/page-header";
import { AddUserDialog } from "@/components/admin/users/add-user-dialog";
import { ExportUsersButton } from "@/components/admin/users/export-users-button";
import { UsersFilter } from "@/components/admin/users/users-filter";
import { UsersSearch } from "@/components/admin/users/users-search";
import { UsersTable } from "@/components/admin/users/users-table";
import { getAdminUsers } from "@/lib/admin/get-users";
import { filterFromParams } from "@/lib/admin/users-filters";
import { parseSort, parseDir } from "@/lib/admin/users-sort";

export const dynamic = "force-dynamic";

type Sp = { q?: string; role?: string; status?: string; sort?: string; dir?: string };
type Props = { searchParams: Promise<Sp> };

export default async function AdminUsersPage({ searchParams }: Props) {
  const sp = await searchParams;
  const sort = parseSort(sp.sort);
  const dir = parseDir(sp.dir);
  const { users, total } = await getAdminUsers({ ...sp, sort, dir });
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
        <div className="flex items-center gap-2">
          <ExportUsersButton q={sp.q} role={sp.role} status={sp.status} />
          <AddUserDialog />
        </div>
      </div>
      <UsersTable users={users} sort={sort} dir={dir} params={sp} />
    </>
  );
}
