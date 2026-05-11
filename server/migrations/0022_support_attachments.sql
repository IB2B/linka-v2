ALTER TABLE support_tickets
  ADD COLUMN attachment_url VARCHAR(500) NULL AFTER body;

ALTER TABLE support_ticket_replies
  ADD COLUMN attachment_url VARCHAR(500) NULL AFTER body;
