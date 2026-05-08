ALTER TABLE users
  ADD COLUMN status ENUM('ACTIVE','SUSPENDED') NOT NULL DEFAULT 'ACTIVE'
  AFTER role;

CREATE INDEX idx_users_role ON users (role);
CREATE INDEX idx_users_status ON users (status);
