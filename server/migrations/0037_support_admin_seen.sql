ALTER TABLE support_tickets
  ADD COLUMN admin_seen_at DATETIME(3) NULL AFTER status;
