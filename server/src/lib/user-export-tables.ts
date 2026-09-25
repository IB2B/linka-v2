export type ExportTable = { key: string; sql: string; omit?: string[] };

const byUser = (key: string, table: string): ExportTable =>
  ({ key, sql: `SELECT * FROM ${table} WHERE user_id = ?` });

// Everything a user can ask to see under GDPR. Secrets (password hash, reset
// and verification codes, provider tokens) and internal bookkeeping are left
// out: they are not useful to the user and would be dangerous in a download.
export const EXPORT_TABLES: ExportTable[] = [
  {
    key: "account", sql: "SELECT * FROM users WHERE id = ?",
    omit: ["password_hash", "session_version", "late_profile_id", "deleted_at"],
  },
  byUser("profile", "user_profiles"),
  byUser("subscription", "subscriptions"),
  byUser("aiInstructions", "user_platform_instructions"),
  byUser("writingSamples", "writing_samples"),
  byUser("voiceProfileVersions", "voice_profile_versions"),
  byUser("posts", "generated_content"),
  byUser("postingHistory", "posting_history"),
  byUser("postMetrics", "post_metric_snapshots"),
  byUser("engagementEvents", "social_engagement_events"),
  byUser("recycleSettings", "recycle_settings"),
  byUser("avatarSettings", "user_avatar_settings"),
  byUser("avatarGroups", "user_avatar_groups"),
  byUser("linkedinMessaging", "linkedin_dm_accounts"),
  byUser("pipelines", "pipelines"),
  {
    key: "pipelineStages",
    sql: `SELECT s.* FROM pipeline_stages s
            JOIN pipelines p ON p.id = s.pipeline_id WHERE p.user_id = ?`,
  },
  byUser("opportunities", "opportunities"),
  byUser("trends", "trends"),
  byUser("trendIdeas", "trend_ideas"),
  byUser("supportTickets", "support_tickets"),
  {
    key: "supportReplies",
    sql: `SELECT r.* FROM support_ticket_replies r
            JOIN support_tickets t ON t.id = r.ticket_id WHERE t.user_id = ?`,
  },
  byUser("feedback", "feedback"),
  { key: "contentReports", sql: "SELECT * FROM content_flags WHERE reporter_id = ?" },
  byUser("notificationsSent", "notification_log"),
];
