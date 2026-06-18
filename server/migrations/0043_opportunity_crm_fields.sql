ALTER TABLE opportunities
  ADD COLUMN value_amount   DECIMAL(12,2) NULL,
  ADD COLUMN value_currency VARCHAR(3)    NULL,
  ADD COLUMN contact_email  VARCHAR(255)  NULL,
  ADD COLUMN expected_close DATE          NULL;
