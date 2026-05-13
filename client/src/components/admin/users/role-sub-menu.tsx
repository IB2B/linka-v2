import { Shield, User as UserIcon } from "lucide-react";
import {
  DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import type { UserRole } from "@/types/user-role";

type Props = { onSetRole: (role: UserRole) => void };

export function RoleSubMenu({ onSetRole }: Props) {
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger><Shield />Change role</DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuItem onClick={() => onSetRole("USER")}><UserIcon />User</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSetRole("ADMIN")}><Shield />Admin</DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
}
