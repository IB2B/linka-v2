-- Rename competitor_links → reference_accounts: the field holds profile URLs or
-- @handles of accounts the user thinks do a great job and wants to emulate.
-- Apify will later scrape these handles to mine their top-performing posts.
-- CHANGE, not RENAME COLUMN: MariaDB < 10.5.2 rejects the RENAME form.
ALTER TABLE user_platform_instructions
  CHANGE competitor_links reference_accounts JSON NULL;
