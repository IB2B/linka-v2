-- Ownership of HeyGen avatar groups created from inside the app.
--
-- HeyGen has no per-user concept: one API key means one shared workspace, so
-- /v2/avatar_group.list returns every avatar on the account. Without this table
-- one user's uploaded face would appear in every other user's avatar picker.
-- Groups recorded here are visible only to their owner; anything not listed is
-- treated as a pre-existing house avatar.
CREATE TABLE IF NOT EXISTS user_avatar_groups (
  group_id VARCHAR(128) NOT NULL PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  name VARCHAR(191) NOT NULL,
  created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  INDEX idx_uag_user (user_id),
  CONSTRAINT fk_uag_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
-- No explicit charset — see 0054: it must collate like users.id or the FK fails.
) ENGINE=InnoDB;
