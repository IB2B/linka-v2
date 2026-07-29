-- Rename competitor_links → reference_accounts: the field holds profile URLs or
-- @handles of accounts the user thinks do a great job and wants to emulate.
-- Apify will later scrape these handles to mine their top-performing posts.
ALTER TABLE user_platform_instructions
  RENAME COLUMN competitor_links TO reference_accounts;
