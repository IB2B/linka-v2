ALTER TABLE writing_samples
  ADD COLUMN title VARCHAR(200) NULL AFTER user_id,
  ADD COLUMN source ENUM('linkedin','email','blog','article','other') NOT NULL DEFAULT 'other' AFTER content,
  ADD COLUMN word_count INT NOT NULL DEFAULT 0 AFTER source,
  ADD COLUMN processed_at DATETIME(3) NULL AFTER word_count;

ALTER TABLE user_profiles
  ADD COLUMN job_title VARCHAR(150) NULL,
  ADD COLUMN target_audience VARCHAR(255) NULL,
  ADD COLUMN voice_dna JSON NULL,
  ADD COLUMN voice_profile_version INT NOT NULL DEFAULT 0,
  ADD COLUMN voice_profile_updated_at DATETIME(3) NULL;

CREATE TABLE IF NOT EXISTS voice_profile_versions (
  id           CHAR(36)    NOT NULL DEFAULT (UUID()) PRIMARY KEY,
  user_id      CHAR(36)    NOT NULL,
  version      INT         NOT NULL,
  voice_dna    JSON        NOT NULL,
  sample_count INT         NOT NULL,
  created_at   DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  INDEX idx_voice_profile_versions_user (user_id),
  CONSTRAINT fk_voice_profile_versions_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;
