CREATE TABLE IF NOT EXISTS social_engagement_events (
  id           CHAR(36)    NOT NULL DEFAULT (UUID()) PRIMARY KEY,
  user_id      CHAR(36)    NOT NULL,
  post_id      CHAR(36)    NOT NULL,
  kind         ENUM('likes','comments') NOT NULL,
  delta        INT         NOT NULL,
  total_after  INT         NOT NULL,
  seen_at      DATETIME(3) NULL,
  created_at   DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  UNIQUE KEY uq_post_kind_total (post_id, kind, total_after),
  INDEX idx_user_created (user_id, created_at),
  CONSTRAINT fk_eng_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_eng_post FOREIGN KEY (post_id) REFERENCES generated_content(id) ON DELETE CASCADE
) ENGINE=InnoDB;
