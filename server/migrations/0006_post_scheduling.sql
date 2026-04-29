ALTER TABLE generated_content
  ADD COLUMN status ENUM('draft','scheduled','posted','failed')
    NOT NULL DEFAULT 'draft' AFTER platform,
  ADD COLUMN scheduled_for DATETIME(3) NULL AFTER status,
  ADD COLUMN posted_at DATETIME(3) NULL AFTER scheduled_for,
  ADD COLUMN late_post_id VARCHAR(120) NULL AFTER posted_at,
  ADD INDEX idx_generated_content_status (user_id, status);
