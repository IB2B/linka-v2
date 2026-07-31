import type { RowDataPacket } from "mysql2";

// Shared by the list and mark-read controllers so both agree on exactly which
// posts surface as notifications — and therefore on the keys "read all" writes.
export interface PostNotificationRow extends RowDataPacket {
  id: string;
  content: string;
  status: "failed" | "scheduled" | "draft";
  scheduled_for: Date | null;
  posted_at: Date | null;
  created_at: Date;
}

export const POST_NOTIFICATIONS_QUERY = `
  SELECT id, content, status, scheduled_for, posted_at, created_at
  FROM generated_content
  WHERE user_id = ?
    AND (
      (status = 'failed' AND COALESCE(posted_at, created_at) >= DATE_SUB(NOW(), INTERVAL 30 DAY))
      OR (status = 'scheduled' AND scheduled_for IS NOT NULL
          AND scheduled_for >= NOW()
          AND scheduled_for <= DATE_ADD(NOW(), INTERVAL 1 DAY))
      OR (status = 'draft' AND created_at >= DATE_SUB(NOW(), INTERVAL 1 DAY))
    )
  ORDER BY COALESCE(scheduled_for, posted_at, created_at) DESC
  LIMIT 12`;

const PREFIX: Record<PostNotificationRow["status"], string> = {
  failed: "fail", scheduled: "up", draft: "gen",
};

// Must stay in lockstep with buildNotifications() on the client.
export function notificationKey(row: PostNotificationRow): string {
  return `${PREFIX[row.status]}-${row.id}`;
}
