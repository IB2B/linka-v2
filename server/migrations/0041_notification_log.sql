CREATE TABLE IF NOT EXISTS notification_log (
  id          CHAR(36)    NOT NULL DEFAULT (UUID()) PRIMARY KEY,
  user_id     CHAR(36)    NOT NULL,
  kind        VARCHAR(40) NOT NULL,
  period_key  VARCHAR(64) NOT NULL,
  sent_at     DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  UNIQUE KEY uq_user_kind_period (user_id, kind, period_key),
  CONSTRAINT fk_notiflog_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;
