-- Extra seed opportunities so the pipeline board feels alive.
-- Uses the default pipeline + stage names created in 0012, scoped per user.

SET @user  := _utf8mb4'00000000-0000-0000-0000-000000000002' COLLATE utf8mb4_general_ci;
SET @admin := _utf8mb4'00000000-0000-0000-0000-000000000001' COLLATE utf8mb4_general_ci;

-- Resolve the user's default pipeline + each stage by (pipeline_id, name).
SELECT id INTO @pu FROM pipelines
  WHERE user_id = @user AND is_default = TRUE LIMIT 1;

SELECT id INTO @su_new   FROM pipeline_stages WHERE pipeline_id = @pu AND name = 'New'         LIMIT 1;
SELECT id INTO @su_qual  FROM pipeline_stages WHERE pipeline_id = @pu AND name = 'Qualified'   LIMIT 1;
SELECT id INTO @su_neg   FROM pipeline_stages WHERE pipeline_id = @pu AND name = 'Negotiating' LIMIT 1;
SELECT id INTO @su_won   FROM pipeline_stages WHERE pipeline_id = @pu AND name = 'Won'         LIMIT 1;
SELECT id INTO @su_lost  FROM pipeline_stages WHERE pipeline_id = @pu AND name = 'Lost'        LIMIT 1;

-- Append after existing rows in each stage.
SELECT COALESCE(MAX(position), -1) + 1 INTO @p_new  FROM opportunities WHERE stage_id = @su_new;
SELECT COALESCE(MAX(position), -1) + 1 INTO @p_qual FROM opportunities WHERE stage_id = @su_qual;
SELECT COALESCE(MAX(position), -1) + 1 INTO @p_neg  FROM opportunities WHERE stage_id = @su_neg;
SELECT COALESCE(MAX(position), -1) + 1 INTO @p_won  FROM opportunities WHERE stage_id = @su_won;
SELECT COALESCE(MAX(position), -1) + 1 INTO @p_lost FROM opportunities WHERE stage_id = @su_lost;

INSERT INTO opportunities
  (id, user_id, pipeline_id, stage_id, title, contact_name, contact_handle,
   source_platform, status, notes, position, last_activity_at) VALUES

  -- New (cold inbound, just landed)
  (UUID(), @user, @pu, @su_new, 'Speaking slot — SaaStr Build EU',
   'Helena Vogt', '@helenavogt', 'linkedin', 'open',
   'CFP closes May 18. They want a 30-min talk on AI content workflows.',
   @p_new,     DATE_SUB(NOW(3), INTERVAL 2 HOUR)),
  (UUID(), @user, @pu, @su_new, 'Newsletter sponsorship — Lenny''s subset',
   'Patrick O''Hare', '@lennysnewsletter', 'x', 'open',
   '$4.2k for a primary slot, 110k subs. Awaiting media kit.',
   @p_new + 1, DATE_SUB(NOW(3), INTERVAL 7 HOUR)),
  (UUID(), @user, @pu, @su_new, 'Beta partner — analytics startup',
   'Devon Reyes', '@reyes.builds', 'threads', 'open',
   'Wants 5 creators for closed beta. Equity + cash mix.',
   @p_new + 2, DATE_SUB(NOW(3), INTERVAL 1 DAY)),
  (UUID(), @user, @pu, @su_new, 'Podcast — The Marketing Millennials',
   'Daniel Murray', '@danielmurray', 'linkedin', 'open',
   NULL,
   @p_new + 3, DATE_SUB(NOW(3), INTERVAL 2 DAY)),
  (UUID(), @user, @pu, @su_new, 'Course collab — community building 101',
   'Rosa Aguilar', '@rosabuilds', 'instagram', 'open',
   '50/50 rev share. Launch window August.',
   @p_new + 4, DATE_SUB(NOW(3), INTERVAL 3 DAY)),

  -- Qualified (early conversations)
  (UUID(), @user, @pu, @su_qual, 'Brand deal — ergonomic chair Q3 push',
   'Mika Tanaka', '@flexchair', 'instagram', 'open',
   '3 reels + 2 stories, $6k. Asked for usage rights breakdown.',
   @p_qual,     DATE_SUB(NOW(3), INTERVAL 6 HOUR)),
  (UUID(), @user, @pu, @su_qual, 'Conference workshop — DevTools Day',
   'Ravi Sharma', '@devtoolsday', 'x', 'open',
   '2-hour hands-on. Travel + $2k honorarium.',
   @p_qual + 1, DATE_SUB(NOW(3), INTERVAL 1 DAY)),
  (UUID(), @user, @pu, @su_qual, 'Affiliate program — calendar SaaS',
   'Aiyana Brooks', '@chronoscal', 'linkedin', 'open',
   '40% first-year, 20% recurring. Need to compare with current top earner.',
   @p_qual + 2, DATE_SUB(NOW(3), INTERVAL 2 DAY)),
  (UUID(), @user, @pu, @su_qual, 'YouTube collab — productivity channel',
   'Theo Lambert', '@theolambert', 'instagram', 'open',
   'Cross-promo, no cash. 180k subs.',
   @p_qual + 3, DATE_SUB(NOW(3), INTERVAL 4 DAY)),

  -- Negotiating (active back-and-forth)
  (UUID(), @user, @pu, @su_neg, 'Annual retainer — fintech thought leadership',
   'Sienna Wolfe', '@sienna.fin', 'linkedin', 'open',
   'They proposed $3.5k/mo for 12 posts. I countered $4.8k with image rights.',
   @p_neg,     DATE_SUB(NOW(3), INTERVAL 5 HOUR)),
  (UUID(), @user, @pu, @su_neg, 'White-label content — agency partnership',
   'Marcus Bell', '@bellcontent', 'x', 'open',
   'Final blocker: exclusivity in fintech vertical. Pushing for non-exclusive.',
   @p_neg + 1, DATE_SUB(NOW(3), INTERVAL 1 DAY)),
  (UUID(), @user, @pu, @su_neg, 'Keynote — RemoteCon Lisbon',
   'Iris Halvorsen', '@remotecon', 'linkedin', 'open',
   'Confirmed slot, sorting travel + comp speaker package.',
   @p_neg + 2, DATE_SUB(NOW(3), INTERVAL 3 DAY)),

  -- Won (closed deals)
  (UUID(), @user, @pu, @su_won, 'Sponsored series — note-taking app',
   'Quill Studio', '@quillapp', 'instagram', 'won',
   'Signed: 4 reels + carousel, $9k flat. Kicks off May 12.',
   @p_won,     DATE_SUB(NOW(3), INTERVAL 4 DAY)),
  (UUID(), @user, @pu, @su_won, 'Workshop sale — async writing playbook',
   'Self-serve', NULL, NULL, 'won',
   '32 seats sold at $149. Replay live until June.',
   @p_won + 1, DATE_SUB(NOW(3), INTERVAL 9 DAY)),
  (UUID(), @user, @pu, @su_won, 'Coaching package — Q2 cohort',
   'Various', NULL, NULL, 'won',
   '6 founders, $2.5k each. Cohort wraps June 30.',
   @p_won + 2, DATE_SUB(NOW(3), INTERVAL 14 DAY)),

  -- Lost (closed-lost / archive)
  (UUID(), @user, @pu, @su_lost, 'Headphones brand — audio creator push',
   'Sonus Audio', '@sonus', 'instagram', 'lost',
   'Went with a bigger creator. They asked to stay in touch for Q4.',
   @p_lost,     DATE_SUB(NOW(3), INTERVAL 11 DAY)),
  (UUID(), @user, @pu, @su_lost, 'Crypto sponsorship — wallet app',
   'BlockHaven', '@blockhaven', 'x', 'lost',
   'Declined — not aligned with audience.',
   @p_lost + 1, DATE_SUB(NOW(3), INTERVAL 18 DAY));

-- Same enrichment for the ADMIN account so /admin views aren''t empty either.
SELECT id INTO @pa FROM pipelines
  WHERE user_id = @admin AND is_default = TRUE LIMIT 1;

SELECT id INTO @sa_new  FROM pipeline_stages WHERE pipeline_id = @pa AND name = 'New'         LIMIT 1;
SELECT id INTO @sa_qual FROM pipeline_stages WHERE pipeline_id = @pa AND name = 'Qualified'   LIMIT 1;
SELECT id INTO @sa_neg  FROM pipeline_stages WHERE pipeline_id = @pa AND name = 'Negotiating' LIMIT 1;
SELECT id INTO @sa_won  FROM pipeline_stages WHERE pipeline_id = @pa AND name = 'Won'         LIMIT 1;
SELECT id INTO @sa_lost FROM pipeline_stages WHERE pipeline_id = @pa AND name = 'Lost'        LIMIT 1;

SELECT COALESCE(MAX(position), -1) + 1 INTO @pa_new  FROM opportunities WHERE stage_id = @sa_new;
SELECT COALESCE(MAX(position), -1) + 1 INTO @pa_qual FROM opportunities WHERE stage_id = @sa_qual;
SELECT COALESCE(MAX(position), -1) + 1 INTO @pa_won  FROM opportunities WHERE stage_id = @sa_won;

INSERT INTO opportunities
  (id, user_id, pipeline_id, stage_id, title, contact_name, contact_handle,
   source_platform, status, notes, position, last_activity_at) VALUES
  (UUID(), @admin, @pa, @sa_new,  'Platform partnership — scheduling tool',
   'Late API team', '@lateapi', 'linkedin', 'open',
   'Co-marketing kickoff, joint case study.',
   @pa_new,      DATE_SUB(NOW(3), INTERVAL 3 HOUR)),
  (UUID(), @admin, @pa, @sa_qual, 'Enterprise pilot — agency rollout',
   'Northstar Agency', '@northstar.studio', 'linkedin', 'open',
   '15 seats, custom voice training. Procurement next week.',
   @pa_qual,     DATE_SUB(NOW(3), INTERVAL 2 DAY)),
  (UUID(), @admin, @pa, @sa_won,  'Annual deal — creator collective',
   'Atelier Co.', '@atelier.co', 'instagram', 'won',
   '12-month plan, paid upfront.',
   @pa_won,      DATE_SUB(NOW(3), INTERVAL 6 DAY));
