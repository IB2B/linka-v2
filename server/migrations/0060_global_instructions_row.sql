-- "Who you are", "What you do" and the image/video design are now written once
-- and shared by every platform, stored on a platform='global' row. Seed that row
-- from each user's most recently updated platform row, then clear the shared
-- columns on the per-platform rows so later edits to the shared brief take effect
-- (a non-empty platform value still overrides the global one — see
-- server/src/lib/instructions-merge.ts).
INSERT INTO user_platform_instructions
  (id, user_id, platform, who_i_am, what_i_do, visual_style, brand_kit)
SELECT UUID(), s.user_id, 'global', s.who_i_am, s.what_i_do, s.visual_style, s.brand_kit
FROM (
  SELECT user_id, who_i_am, what_i_do, visual_style, brand_kit,
         ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY updated_at DESC) AS rn
  FROM user_platform_instructions
  WHERE platform <> 'global'
    AND (who_i_am IS NOT NULL OR what_i_do IS NOT NULL
         OR visual_style IS NOT NULL OR brand_kit IS NOT NULL)
) AS s
WHERE s.rn = 1;

UPDATE user_platform_instructions
SET who_i_am = NULL, what_i_do = NULL, visual_style = NULL, brand_kit = NULL
WHERE platform <> 'global';
