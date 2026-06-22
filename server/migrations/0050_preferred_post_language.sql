-- Per-user default language for AI-generated posts. NULL = fall back to the
-- user's app locale (next-intl NEXT_LOCALE), then English. Written through on
-- every generation so the last chosen language sticks for "Surprise me" too.
ALTER TABLE user_profiles
  ADD COLUMN preferred_language VARCHAR(8) NULL;
