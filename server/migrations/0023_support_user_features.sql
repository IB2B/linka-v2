ALTER TABLE support_tickets
  ADD COLUMN last_viewed_at DATETIME(3) NULL AFTER closed_at,
  ADD COLUMN rating         TINYINT     NULL AFTER last_viewed_at;
