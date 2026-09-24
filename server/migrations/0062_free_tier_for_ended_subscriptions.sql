-- Ended subscriptions kept their paid plan_tier, and every feature gate reads
-- plan_tier alone, so anyone who cancelled or stopped paying kept paid access.
-- upsertSubscription now writes 'free' for these statuses. This fixes old rows.
UPDATE subscriptions
   SET plan_tier = 'free'
 WHERE status IN ('canceled', 'unpaid', 'incomplete', 'incomplete_expired', 'paused')
   AND plan_tier <> 'free';
