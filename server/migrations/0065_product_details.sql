-- Richer product briefs for "Promote a product": the customer's problem, what
-- they use today, what sets the product apart, pricing, proof, words to avoid,
-- and free-form knowledge (pasted or uploaded docs) the AI reads when writing.
ALTER TABLE products
  ADD COLUMN problem         VARCHAR(500) NULL AFTER audience,
  ADD COLUMN alternatives    VARCHAR(500) NULL AFTER problem,
  ADD COLUMN differentiators TEXT         NULL AFTER features,
  ADD COLUMN pricing         VARCHAR(500) NULL AFTER differentiators,
  ADD COLUMN proof           TEXT         NULL AFTER pricing,
  ADD COLUMN avoid           VARCHAR(500) NULL AFTER cta,
  ADD COLUMN knowledge       MEDIUMTEXT   NULL AFTER avoid;
