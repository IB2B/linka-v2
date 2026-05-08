ALTER TABLE app_settings
  ADD COLUMN signups_enabled        BOOLEAN      NOT NULL DEFAULT TRUE  AFTER maintenance_mode,
  ADD COLUMN trial_days             INT          NOT NULL DEFAULT 7,
  ADD COLUMN min_password_length    INT          NOT NULL DEFAULT 8,
  ADD COLUMN require_mfa            BOOLEAN      NOT NULL DEFAULT FALSE,
  ADD COLUMN session_timeout_min    INT          NOT NULL DEFAULT 10080,
  ADD COLUMN auto_suspend_days      INT          NOT NULL DEFAULT 0,
  ADD COLUMN alert_email            VARCHAR(255) NULL,
  ADD COLUMN slack_webhook_url      VARCHAR(500) NULL,
  ADD COLUMN daily_digest_enabled   BOOLEAN      NOT NULL DEFAULT FALSE,
  ADD COLUMN logo_url               VARCHAR(500) NULL,
  ADD COLUMN primary_color          VARCHAR(20)  NULL,
  ADD COLUMN email_sender_name      VARCHAR(100) NULL,
  ADD COLUMN email_footer_text      VARCHAR(500) NULL;
