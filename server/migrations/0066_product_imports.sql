-- One row per "Fill from site" import. Each import costs a Tavily read and an
-- AI call, so it gets a daily cap per plan that survives restarts (the old
-- in-memory counter didn't), and the rows double as an audit trail of which
-- URLs each user imported. Failed imports delete their row.
CREATE TABLE product_imports (
  id          BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id     CHAR(36)      NOT NULL,
  url         VARCHAR(500)  NOT NULL,
  created_at  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_product_imports_user_time (user_id, created_at),
  CONSTRAINT fk_product_imports_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;
