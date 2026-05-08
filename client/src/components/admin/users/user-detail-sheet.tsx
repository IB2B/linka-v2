"use client";

import { useEffect, useState } from "react";

import {
  Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle,
} from "@/components/ui/sheet";
import { Spinner } from "@/components/ui/spinner";
import { UserDetailActivity } from "@/components/admin/users/user-detail-activity";
import { UserDetailHeader } from "@/components/admin/users/user-detail-header";
import { UserDetailMeta } from "@/components/admin/users/user-detail-meta";
import { UserDetailSection } from "@/components/admin/users/user-detail-section";
import { UserDetailStats } from "@/components/admin/users/user-detail-stats";
import { getUserDetail } from "@/lib/admin/get-user-detail";
import type { AdminUserDetail } from "@/types/admin";

type Props = { userId: string | null; onClose: () => void };

export function UserDetailSheet({ userId, onClose }: Props) {
  const [detail, setDetail] = useState<AdminUserDetail | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) { setDetail(null); return; }
    let cancelled = false;
    setLoading(true);
    getUserDetail(userId).then((d) => {
      if (!cancelled) { setDetail(d); setLoading(false); }
    });
    return () => { cancelled = true; };
  }, [userId]);

  return (
    <Sheet open={!!userId} onOpenChange={(o) => { if (!o) onClose(); }}>
      <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-lg">
        <SheetHeader className="sr-only">
          <SheetTitle>User detail</SheetTitle>
          <SheetDescription>Full profile for the selected user.</SheetDescription>
        </SheetHeader>
        {detail && <UserDetailHeader user={detail.user} />}
        <div className="flex flex-1 flex-col gap-6 overflow-y-auto border-t px-6 py-5">
          {loading && !detail && (
            <div className="flex items-center justify-center py-10"><Spinner /></div>
          )}
          {detail && (
            <>
              <UserDetailStats stats={detail.stats} />
              <UserDetailSection title="Profile">
                <UserDetailMeta detail={detail} />
              </UserDetailSection>
              <UserDetailSection title="Recent activity">
                <UserDetailActivity events={detail.activity} />
              </UserDetailSection>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
