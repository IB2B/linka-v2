-- Switched LinkedIn DMs back to Unipile (hosted auth). 0051 had dropped
-- linkedin_dm_accounts and recreated linkup_accounts; reverse that: drop the
-- LinkupAPI table and recreate the Unipile one (stores only the account_id
-- returned after the user logs in on Unipile's hosted page).
DROP TABLE IF EXISTS linkup_accounts;

CREATE TABLE IF NOT EXISTS linkedin_dm_accounts (
  id           CHAR(36)     NOT NULL DEFAULT (UUID()) PRIMARY KEY,
  user_id      CHAR(36)     NOT NULL UNIQUE,
  account_id   VARCHAR(128) NOT NULL,
  display_name VARCHAR(255) NULL,
  email        VARCHAR(255) NULL,
  status       VARCHAR(32)  NOT NULL DEFAULT 'connected',
  created_at   DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at   DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  CONSTRAINT fk_linkedin_dm_accounts_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;
