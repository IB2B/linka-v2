CREATE TABLE IF NOT EXISTS recycle_settings (
  user_id           CHAR(36)    NOT NULL PRIMARY KEY,
  enabled           TINYINT(1)  NOT NULL DEFAULT 0,
  per_week          INT         NOT NULL DEFAULT 1,
  min_age_days      INT         NOT NULL DEFAULT 30,
  last_run_at       DATETIME(3) NULL,
  created_at        DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at        DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
                    ON UPDATE CURRENT_TIMESTAMP(3),
  CONSTRAINT fk_recycle_user FOREIGN KEY (user_id)
    REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;
