-- Persist the AI virality score so it survives navigation/reload instead of
-- living only in client state. Reasons/suggestions kept as JSON arrays.
ALTER TABLE generated_content
  ADD COLUMN virality_score INT NULL AFTER late_post_id,
  ADD COLUMN virality_reasons JSON NULL AFTER virality_score,
  ADD COLUMN virality_suggestions JSON NULL AFTER virality_reasons;
