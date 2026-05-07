CREATE TABLE IF NOT EXISTS feedback (
  id          CHAR(36)    NOT NULL DEFAULT (UUID()) PRIMARY KEY,
  user_id     CHAR(36)    NULL,
  category    ENUM('bug','feature','general') NOT NULL DEFAULT 'general',
  message     TEXT        NOT NULL,
  page_url    VARCHAR(500) NULL,
  user_agent  VARCHAR(500) NULL,
  status      ENUM('new','triaged','closed') NOT NULL DEFAULT 'new',
  created_at  DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  INDEX idx_feedback_user (user_id),
  INDEX idx_feedback_status (status),
  CONSTRAINT fk_feedback_user FOREIGN KEY (user_id)
    REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;
