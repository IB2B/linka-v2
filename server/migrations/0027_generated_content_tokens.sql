ALTER TABLE generated_content
  ADD COLUMN tokens_input  INT UNSIGNED NULL DEFAULT NULL AFTER content,
  ADD COLUMN tokens_output INT UNSIGNED NULL DEFAULT NULL AFTER tokens_input,
  ADD COLUMN model         VARCHAR(80)  NULL DEFAULT NULL AFTER tokens_output;
