ALTER TABLE generated_content
  ADD COLUMN image_model VARCHAR(80) NULL DEFAULT NULL AFTER image_status;
