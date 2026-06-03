-- target_audience already exists (0003_voice_lab) and is read by voice analysis;
-- onboarding now populates it. Only the goal/tone signals are new.
ALTER TABLE user_profiles
  ADD COLUMN content_goal  VARCHAR(60) NULL,
  ADD COLUMN brand_tone    VARCHAR(60) NULL;
