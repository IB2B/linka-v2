CREATE TABLE IF NOT EXISTS post_metric_snapshots (
  id              CHAR(36)     NOT NULL DEFAULT (UUID()) PRIMARY KEY,
  post_id         CHAR(36)     NOT NULL,
  user_id         CHAR(36)     NOT NULL,
  fetched_at      DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  impressions     INT          NOT NULL DEFAULT 0,
  reach           INT          NOT NULL DEFAULT 0,
  likes           INT          NOT NULL DEFAULT 0,
  comments        INT          NOT NULL DEFAULT 0,
  shares          INT          NOT NULL DEFAULT 0,
  saves           INT          NOT NULL DEFAULT 0,
  clicks          INT          NOT NULL DEFAULT 0,
  views           INT          NOT NULL DEFAULT 0,
  engagement_rate DECIMAL(8,5) NOT NULL DEFAULT 0,
  INDEX idx_snap_post (post_id, fetched_at),
  CONSTRAINT fk_snap_post FOREIGN KEY (post_id)
    REFERENCES generated_content(id) ON DELETE CASCADE,
  CONSTRAINT fk_snap_user FOREIGN KEY (user_id)
    REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;
