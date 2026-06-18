-- Platform-wide controls the admin manages from Settings → Platform.
-- Single-row table (id is pinned to 1).
CREATE TABLE IF NOT EXISTS platform_settings (
  id TINYINT NOT NULL PRIMARY KEY DEFAULT 1,
  signups_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  maintenance_mode BOOLEAN NOT NULL DEFAULT FALSE,
  maintenance_message VARCHAR(280) NULL,
  announcement_enabled BOOLEAN NOT NULL DEFAULT FALSE,
  announcement_message VARCHAR(280) NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO platform_settings (id) VALUES (1)
  ON DUPLICATE KEY UPDATE id = id;
