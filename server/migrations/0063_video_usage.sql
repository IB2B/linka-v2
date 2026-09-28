-- One row per video render, for the monthly per-plan video quota. The old
-- in-memory daily counter reset on every restart and gave every plan the same
-- cap. Failed renders delete their row, so they never cost the user a video.
CREATE TABLE video_usage (
  id          BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id     CHAR(36)  NOT NULL,
  content_id  CHAR(36)  NOT NULL,
  created_at  DATETIME  NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_video_usage_user_month (user_id, created_at),
  KEY idx_video_usage_content (content_id),
  CONSTRAINT fk_video_usage_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;
