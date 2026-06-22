-- LinkedIn DMs were switched back to LinkupAPI (reverted from Unipile). Migration
-- 0047 had dropped linkup_accounts and created linkedin_dm_accounts; recreate the
-- LinkupAPI table and drop the now-unused Unipile one. login_token holds the
-- LinkedIn auth cookie from the login/verify flow.
DROP TABLE IF EXISTS linkedin_dm_accounts;

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
