ALTER TABLE support_tickets
  ADD COLUMN priority ENUM('low','normal','high','urgent') NOT NULL DEFAULT 'normal' AFTER status,
  ADD COLUMN category VARCHAR(50) NULL AFTER priority,
  ADD COLUMN closed_at DATETIME(3) NULL;

CREATE TABLE IF NOT EXISTS support_ticket_replies (
  id           CHAR(36)    NOT NULL DEFAULT (UUID()) PRIMARY KEY,
  ticket_id    CHAR(36)    NOT NULL,
  author_id    CHAR(36)    NOT NULL,
  body         TEXT        NOT NULL,
  is_admin     BOOLEAN     NOT NULL DEFAULT FALSE,
  created_at   DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  INDEX idx_ticket_replies_ticket (ticket_id),
  CONSTRAINT fk_ticket_replies_ticket FOREIGN KEY (ticket_id) REFERENCES support_tickets(id) ON DELETE CASCADE,
  CONSTRAINT fk_ticket_replies_author FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;
