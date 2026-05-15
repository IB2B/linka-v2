CREATE TABLE IF NOT EXISTS trends (
  id           CHAR(36)     NOT NULL DEFAULT (UUID()) PRIMARY KEY,
  user_id      CHAR(36)     NOT NULL,
  title        VARCHAR(255) NOT NULL,
  url          VARCHAR(500) NULL,
  source       VARCHAR(120) NULL,
  summary      TEXT         NULL,
  score        TINYINT      NOT NULL DEFAULT 50,
  fetched_at   DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  INDEX idx_trends_user (user_id, fetched_at),
  CONSTRAINT fk_trends_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS trend_ideas (
  id         CHAR(36)     NOT NULL DEFAULT (UUID()) PRIMARY KEY,
  trend_id   CHAR(36)     NOT NULL,
  user_id    CHAR(36)     NOT NULL,
  hook       VARCHAR(500) NOT NULL,
  angle      VARCHAR(120) NULL,
  platform   VARCHAR(50)  NULL,
  score      TINYINT      NOT NULL DEFAULT 50,
  created_at DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  INDEX idx_ideas_trend (trend_id),
  INDEX idx_ideas_user (user_id, created_at),
  CONSTRAINT fk_ideas_trend FOREIGN KEY (trend_id) REFERENCES trends(id) ON DELETE CASCADE,
  CONSTRAINT fk_ideas_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;
