ALTER TABLE users
  ADD COLUMN email_verified_at DATETIME(3) NULL AFTER role;

UPDATE users SET email_verified_at = NOW(3) WHERE email_verified_at IS NULL;

CREATE TABLE IF NOT EXISTS email_verification_codes (
  user_id     CHAR(36)    NOT NULL PRIMARY KEY,
  code_hash   CHAR(64)    NOT NULL,
  expires_at  DATETIME(3) NOT NULL,
  attempts    INT         NOT NULL DEFAULT 0,
  created_at  DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  INDEX idx_evc_expires (expires_at),
  CONSTRAINT fk_evc_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;
