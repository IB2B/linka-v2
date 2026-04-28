CREATE TABLE IF NOT EXISTS users (
  id                   CHAR(36)     NOT NULL DEFAULT (UUID()) PRIMARY KEY,
  email                VARCHAR(255) NOT NULL UNIQUE,
  password_hash        VARCHAR(255) NOT NULL,
  first_name           VARCHAR(100) NOT NULL,
  last_name            VARCHAR(100) NOT NULL,
  role                 ENUM('USER','ADMIN','SUPER_ADMIN') NOT NULL DEFAULT 'USER',
  onboarding_completed BOOLEAN      NOT NULL DEFAULT FALSE,
  onboarding_step      INT          NOT NULL DEFAULT 1,
  created_at           DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at           DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS user_profiles (
  id          CHAR(36)    NOT NULL DEFAULT (UUID()) PRIMARY KEY,
  user_id     CHAR(36)    NOT NULL UNIQUE,
  bio         TEXT        NULL,
  avatar_url  VARCHAR(500) NULL,
  industry    VARCHAR(100) NULL,
  created_at  DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at  DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  CONSTRAINT fk_user_profiles_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS subscriptions (
  id                     CHAR(36)    NOT NULL DEFAULT (UUID()) PRIMARY KEY,
  user_id                CHAR(36)    NOT NULL UNIQUE,
  stripe_customer_id     VARCHAR(255) NULL,
  stripe_subscription_id VARCHAR(255) NULL,
  plan_tier              VARCHAR(50)  NOT NULL DEFAULT 'free',
  status                 VARCHAR(50)  NOT NULL DEFAULT 'active',
  current_period_start   DATETIME(3)  NULL,
  current_period_end     DATETIME(3)  NULL,
  cancel_at_period_end   BOOLEAN      NOT NULL DEFAULT FALSE,
  canceled_at            DATETIME(3)  NULL,
  created_at             DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at             DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  CONSTRAINT fk_subscriptions_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS linkedin_credentials (
  id            CHAR(36)    NOT NULL DEFAULT (UUID()) PRIMARY KEY,
  user_id       CHAR(36)    NOT NULL,
  access_token  TEXT        NOT NULL,
  refresh_token TEXT        NULL,
  expires_at    DATETIME(3) NULL,
  created_at    DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at    DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  INDEX idx_linkedin_credentials_user (user_id),
  CONSTRAINT fk_linkedin_credentials_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS writing_samples (
  id         CHAR(36)    NOT NULL DEFAULT (UUID()) PRIMARY KEY,
  user_id    CHAR(36)    NOT NULL,
  content    TEXT        NOT NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  INDEX idx_writing_samples_user (user_id),
  CONSTRAINT fk_writing_samples_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS generated_content (
  id         CHAR(36)    NOT NULL DEFAULT (UUID()) PRIMARY KEY,
  user_id    CHAR(36)    NOT NULL,
  prompt     TEXT        NULL,
  content    TEXT        NOT NULL,
  image_url  VARCHAR(500) NULL,
  platform   VARCHAR(50) NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  INDEX idx_generated_content_user (user_id),
  CONSTRAINT fk_generated_content_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS posting_history (
  id         CHAR(36)    NOT NULL DEFAULT (UUID()) PRIMARY KEY,
  user_id    CHAR(36)    NOT NULL,
  content_id CHAR(36)    NULL,
  platform   VARCHAR(50) NOT NULL,
  status     VARCHAR(50) NOT NULL,
  posted_at  DATETIME(3) NULL,
  error_msg  TEXT        NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  INDEX idx_posting_history_user (user_id),
  CONSTRAINT fk_posting_history_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS admin_actions (
  id         CHAR(36)    NOT NULL DEFAULT (UUID()) PRIMARY KEY,
  admin_id   CHAR(36)    NOT NULL,
  target_id  CHAR(36)    NULL,
  action     VARCHAR(100) NOT NULL,
  details    JSON        NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  INDEX idx_admin_actions_admin (admin_id),
  CONSTRAINT fk_admin_actions_admin FOREIGN KEY (admin_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS support_tickets (
  id         CHAR(36)    NOT NULL DEFAULT (UUID()) PRIMARY KEY,
  user_id    CHAR(36)    NOT NULL,
  subject    VARCHAR(255) NOT NULL,
  body       TEXT        NOT NULL,
  status     VARCHAR(50) NOT NULL DEFAULT 'open',
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  INDEX idx_support_tickets_user (user_id),
  CONSTRAINT fk_support_tickets_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;
