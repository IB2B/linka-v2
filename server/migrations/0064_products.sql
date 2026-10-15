-- Products a user promotes (usually their own SaaS). Saved once in Settings and
-- picked on the Generate page for "Promote a product" posts, so the AI writes
-- from real details instead of a vague "what you do".
CREATE TABLE products (
  id          CHAR(36)      NOT NULL PRIMARY KEY,
  user_id     CHAR(36)      NOT NULL,
  name        VARCHAR(120)  NOT NULL,
  url         VARCHAR(500)  NULL,
  pitch       VARCHAR(300)  NOT NULL,
  audience    VARCHAR(300)  NULL,
  features    TEXT          NULL,
  cta         VARCHAR(200)  NULL,
  created_at  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_products_user (user_id, created_at),
  CONSTRAINT fk_products_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;
