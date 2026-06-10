-- Records when an image job entered 'generating' so the boot reaper can tell a
-- freshly-interrupted job (resume it) from a long-abandoned one (fail it).
ALTER TABLE generated_content
  ADD COLUMN image_started_at DATETIME NULL AFTER image_status;
