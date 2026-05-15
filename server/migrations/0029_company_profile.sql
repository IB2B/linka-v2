ALTER TABLE user_profiles
  ADD COLUMN company_type    VARCHAR(100) NULL,
  ADD COLUMN company_size    VARCHAR(50)  NULL,
  ADD COLUMN funding_amount  VARCHAR(50)  NULL;
