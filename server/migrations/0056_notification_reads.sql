-- Read receipts for *derived* notifications. Post notices (draft ready,
-- publish failed, going live soon) are computed from generated_content and
-- have no row of their own, so "seen" needs its own store. Keyed by the
-- synthetic notification id (e.g. "gen-<postId>") since one post can raise
-- several distinct notices over its lifetime.
CREATE TABLE notification_reads (
  user_id          VARCHAR(36)  NOT NULL,
  notification_key VARCHAR(100) NOT NULL,
  seen_at          DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (user_id, notification_key),
  CONSTRAINT fk_notification_reads_user
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
