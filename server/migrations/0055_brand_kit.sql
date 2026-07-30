-- Structured brand kit (exact hex colours + font names) per platform, authored
-- in Settings → AI Instructions. Colours steer image/video generation; fonts are
-- stored for future branded text designs. Shape: { primary, secondary, accent,
-- background, text, headingFont, bodyFont }.
ALTER TABLE user_platform_instructions
  ADD COLUMN brand_kit JSON NULL AFTER visual_style;
