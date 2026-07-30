-- Per-platform AI brand/voice brief a user authors in Settings → AI Instructions.
-- One row per (user, platform). competitor_links is a JSON array of up to 5 URLs
-- of accounts the user admires. Threaded into the content-generation prompt
-- (see server/src/lib/platform-brief.ts + post-prompt.ts).
CREATE TABLE IF NOT EXISTS user_platform_instructions (
  id CHAR(36) NOT NULL PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  platform VARCHAR(32) NOT NULL,
  who_i_am TEXT NULL,
  what_i_do TEXT NULL,
  goals TEXT NULL,
  interests TEXT NULL,
  post_types TEXT NULL,
  tone TEXT NULL,
  visual_style TEXT NULL,
  competitor_links JSON NULL,
  extra_notes TEXT NULL,
  created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  UNIQUE KEY uq_user_platform (user_id, platform),
  CONSTRAINT fk_upi_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
