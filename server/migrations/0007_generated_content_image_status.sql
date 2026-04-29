ALTER TABLE generated_content
  ADD COLUMN image_status ENUM('pending','generating','completed','failed','skipped')
    NOT NULL DEFAULT 'skipped',
  ADD COLUMN image_prompt TEXT NULL,
  ADD COLUMN image_error  TEXT NULL;
