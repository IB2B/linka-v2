-- Per-user HeyGen avatar + voice selection for talking-head post videos.
-- One row per user, chosen in Settings; read by avatar-video.service.ts when
-- rendering a post as a presenter speaking to camera.
CREATE TABLE IF NOT EXISTS user_avatar_settings (
  user_id CHAR(36) NOT NULL PRIMARY KEY,
  avatar_id VARCHAR(128) NOT NULL,
  voice_id VARCHAR(128) NOT NULL,
  created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  CONSTRAINT fk_uas_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
-- No explicit charset — see 0054: it must collate like users.id or the FK fails.
) ENGINE=InnoDB;
