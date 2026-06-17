-- Per-user LinkedIn DM connection via LinkupAPI. Stores the LinkedIn auth
-- cookie (login_token) returned by the login/verify flow, plus the proxy
-- region used for that account. One row per user.
CREATE TABLE IF NOT EXISTS linkup_accounts (
  id             CHAR(36)     NOT NULL DEFAULT (UUID()) PRIMARY KEY,
  user_id        CHAR(36)     NOT NULL UNIQUE,
  login_token    TEXT         NULL,
  linkedin_email VARCHAR(255) NULL,
  display_name   VARCHAR(255) NULL,
  country        VARCHAR(3)   NOT NULL DEFAULT 'US',
  status         VARCHAR(32)  NOT NULL DEFAULT 'connected',
  created_at     DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at     DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  CONSTRAINT fk_linkup_accounts_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;
