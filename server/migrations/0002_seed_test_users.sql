-- Test accounts:
--   admin@linka.test / admin123  (ADMIN)
--   user@linka.test  / user123   (USER)

INSERT INTO users (
  id, email, password_hash, first_name, last_name, role, onboarding_completed
) VALUES
  ('00000000-0000-0000-0000-000000000001', 'admin@linka.test',
   '$2b$12$BLiz6FPknPQPoAtbdeXO5uivz/oY4z743PSQcYJUZpq7mprwhIowO',
   'Admin', 'User', 'ADMIN', TRUE),
  ('00000000-0000-0000-0000-000000000002', 'user@linka.test',
   '$2b$12$2qsGXUgHQvtQpAdnM5WS8OWnkQH.tWjw6ajhj6H4XVMw0uRxVtIxm',
   'Test', 'User', 'USER', TRUE)
ON DUPLICATE KEY UPDATE
  password_hash = VALUES(password_hash),
  role          = VALUES(role);
