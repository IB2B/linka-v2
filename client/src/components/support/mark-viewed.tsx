"use client";

import { useEffect } from "react";

import { markTicketViewedAction } from "@/app/dashboard/support/actions";

export function MarkViewed({ id }: { id: string }) {
  useEffect(() => {
    markTicketViewedAction(id).catch(() => {});
  }, [id]);
  return null;
}
