-- Remove all seeded pipeline opportunities for the test accounts created in 0002/0013.
DELETE FROM opportunities
WHERE user_id IN (
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000002'
);
