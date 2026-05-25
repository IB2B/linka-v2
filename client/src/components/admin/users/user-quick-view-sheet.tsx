"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, RotateCw } from "lucide-react";

import {
  Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle,
} from "@/components/ui/sheet";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { InboxAvatar } from "@/components/inbox/inbox-avatar";
import { UserQuickViewContent } from "./user-quick-view-content";
import type { AdminUserDetail, AdminUserRow } from "@/types/admin";

type Props = { user: AdminUserRow; onClose: () => void };

export function UserQuickViewSheet({ user, onClose }: Props) {
  const [detail, setDetail] = useState<AdminUserDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const cancelledRef = useRef(false);
  const fullName = `${user.firstName} ${user.lastName}`.trim() || user.email;

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    cancelledRef.current = false;
    fetch(`/api/admin/users/${user.id}/detail`)
      .then((r) => r.ok ? r.json() : Promise.reject(new Error("Failed to load user details.")))
      .then((d: AdminUserDetail) => { if (!cancelledRef.current) setDetail(d); })
      .catch((e: Error) => { if (!cancelledRef.current) setError(e.message); })
      .finally(() => { if (!cancelledRef.current) setLoading(false); });
  }, [user.id]);

  useEffect(() => {
    load();
    return () => { cancelledRef.current = true; };
  }, [load]);

  return (
    <Sheet open onOpenChange={(o) => !o && onClose()}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-md">
        <SheetHeader className="gap-3 border-b">
          <div className="flex items-start gap-3">
            <InboxAvatar name={fullName} src={user.avatarUrl} />
            <div className="min-w-0 flex-1">
              <SheetTitle className="truncate">{fullName}</SheetTitle>
              <SheetDescription className="truncate">{user.email}</SheetDescription>
            </div>
          </div>
          <Button
            variant="outline"
            size="xs"
            className="w-fit"
            render={<Link href={`/admin/users/${user.id}`} />}
            nativeButton={false}
          >
            Open full page <ArrowUpRight data-icon="inline-end" />
          </Button>
        </SheetHeader>
        <div className="px-4 pb-6">
          {loading && (
            <div className="flex items-center justify-center py-12 text-muted-foreground"><Spinner /></div>
          )}
          {error && !loading && (
            <div className="flex flex-col items-center gap-3 py-12 text-center">
              <p className="text-sm text-destructive">{error}</p>
              <Button variant="outline" size="sm" onClick={load}>
                <RotateCw className="size-3.5" /> Retry
              </Button>
            </div>
          )}
          {detail && !loading && !error && <UserQuickViewContent detail={detail} />}
        </div>
      </SheetContent>
    </Sheet>
  );
}
