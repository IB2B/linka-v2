-- AI video generation (Higgsfield) attached to generated_content.
-- Mirrors the image_* columns. video_url holds Higgsfield's CDN URL directly
-- (public, no local storage — keeps us off the ephemeral uploads volume).
ALTER TABLE generated_content
  ADD COLUMN video_url    VARCHAR(1024) NULL,
  ADD COLUMN video_status VARCHAR(20)   NOT NULL DEFAULT 'skipped',
  ADD COLUMN video_prompt TEXT          NULL,
  ADD COLUMN video_error  VARCHAR(1000) NULL,
  ADD COLUMN video_model  VARCHAR(80)   NULL,
  ADD COLUMN video_started_at DATETIME  NULL;
