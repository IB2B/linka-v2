ALTER TABLE users
  ADD COLUMN deleted_at DATETIME(3) NULL DEFAULT NULL AFTER session_version;

CREATE INDEX idx_users_deleted_at ON users(deleted_at);
