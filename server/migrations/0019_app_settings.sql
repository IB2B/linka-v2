CREATE TABLE IF NOT EXISTS app_settings (
  id                INT          NOT NULL DEFAULT 1 PRIMARY KEY,
  app_name          VARCHAR(100) NOT NULL DEFAULT 'linka',
  support_email     VARCHAR(255) NULL,
  default_plan_tier VARCHAR(50)  NOT NULL DEFAULT 'free',
  maintenance_mode  BOOLEAN      NOT NULL DEFAULT FALSE,
  updated_at        DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  CONSTRAINT chk_singleton CHECK (id = 1)
) ENGINE=InnoDB;

INSERT IGNORE INTO app_settings (id) VALUES (1);
