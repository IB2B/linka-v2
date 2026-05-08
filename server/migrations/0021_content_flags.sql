CREATE TABLE IF NOT EXISTS content_flags (
  id           CHAR(36)    NOT NULL DEFAULT (UUID()) PRIMARY KEY,
  content_id   CHAR(36)    NOT NULL,
  reporter_id  CHAR(36)    NOT NULL,
  reason       ENUM('spam','harassment','hate','misinformation','sexual','violence','other')
               NOT NULL DEFAULT 'other',
  details      TEXT        NULL,
  status       ENUM('pending','reviewing','dismissed','actioned')
               NOT NULL DEFAULT 'pending',
  resolution   ENUM('none','dismissed','hidden','user_warned','user_suspended')
               NOT NULL DEFAULT 'none',
  reviewed_by  CHAR(36)    NULL,
  reviewed_at  DATETIME(3) NULL,
  created_at   DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  INDEX idx_content_flags_status (status, created_at),
  INDEX idx_content_flags_content (content_id),
  CONSTRAINT fk_flags_content  FOREIGN KEY (content_id)
    REFERENCES generated_content(id) ON DELETE CASCADE,
  CONSTRAINT fk_flags_reporter FOREIGN KEY (reporter_id)
    REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_flags_reviewer FOREIGN KEY (reviewed_by)
    REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

ALTER TABLE generated_content
  ADD COLUMN hidden_at DATETIME(3) NULL,
  ADD COLUMN hidden_by CHAR(36)    NULL;
