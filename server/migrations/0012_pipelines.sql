CREATE TABLE IF NOT EXISTS pipelines (
  id          CHAR(36)    NOT NULL DEFAULT (UUID()) PRIMARY KEY,
  user_id     CHAR(36)    NOT NULL,
  name        VARCHAR(120) NOT NULL,
  is_default  BOOLEAN     NOT NULL DEFAULT FALSE,
  created_at  DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  INDEX idx_pipelines_user (user_id),
  CONSTRAINT fk_pipelines_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS pipeline_stages (
  id           CHAR(36)    NOT NULL DEFAULT (UUID()) PRIMARY KEY,
  pipeline_id  CHAR(36)    NOT NULL,
  name         VARCHAR(80) NOT NULL,
  position     INT         NOT NULL,
  outcome      ENUM('open','won','lost') NOT NULL DEFAULT 'open',
  INDEX idx_stages_pipeline (pipeline_id, position),
  CONSTRAINT fk_stages_pipeline FOREIGN KEY (pipeline_id) REFERENCES pipelines(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS opportunities (
  id              CHAR(36)    NOT NULL DEFAULT (UUID()) PRIMARY KEY,
  user_id         CHAR(36)    NOT NULL,
  pipeline_id     CHAR(36)    NOT NULL,
  stage_id        CHAR(36)    NOT NULL,
  title           VARCHAR(255) NOT NULL,
  contact_name    VARCHAR(160) NULL,
  contact_handle  VARCHAR(160) NULL,
  source_platform VARCHAR(50)  NULL,
  status          ENUM('open','won','lost') NOT NULL DEFAULT 'open',
  conversation_id VARCHAR(255) NULL,
  notes           TEXT         NULL,
  position        INT          NOT NULL DEFAULT 0,
  last_activity_at DATETIME(3) NULL,
  created_at      DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at      DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  INDEX idx_opps_board (user_id, pipeline_id, stage_id, position),
  CONSTRAINT fk_opps_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_opps_pipeline FOREIGN KEY (pipeline_id) REFERENCES pipelines(id) ON DELETE CASCADE,
  CONSTRAINT fk_opps_stage FOREIGN KEY (stage_id) REFERENCES pipeline_stages(id) ON DELETE RESTRICT
) ENGINE=InnoDB;

-- Seed default pipeline + 5 stages for the two test users so the page has data.
SET @admin := '00000000-0000-0000-0000-000000000001';
SET @user  := '00000000-0000-0000-0000-000000000002';

SET @pa := UUID();
SET @pu := UUID();
INSERT INTO pipelines (id, user_id, name, is_default) VALUES
  (@pa, @admin, 'Opportunities', TRUE),
  (@pu, @user,  'Opportunities', TRUE);

SET @sa1 := UUID();
SET @sa2 := UUID();
SET @sa3 := UUID();
SET @sa4 := UUID();
SET @sa5 := UUID();
SET @su1 := UUID();
SET @su2 := UUID();
SET @su3 := UUID();
SET @su4 := UUID();
SET @su5 := UUID();

INSERT INTO pipeline_stages (id, pipeline_id, name, position, outcome) VALUES
  (@sa1, @pa, 'New',         0, 'open'),
  (@sa2, @pa, 'Qualified',   1, 'open'),
  (@sa3, @pa, 'Negotiating', 2, 'open'),
  (@sa4, @pa, 'Won',         3, 'won'),
  (@sa5, @pa, 'Lost',        4, 'lost'),
  (@su1, @pu, 'New',         0, 'open'),
  (@su2, @pu, 'Qualified',   1, 'open'),
  (@su3, @pu, 'Negotiating', 2, 'open'),
  (@su4, @pu, 'Won',         3, 'won'),
  (@su5, @pu, 'Lost',        4, 'lost');

INSERT INTO opportunities
  (id, user_id, pipeline_id, stage_id, title, contact_name, contact_handle, source_platform, status, notes, position) VALUES
  (UUID(), @user, @pu, @su1, 'Sponsorship inquiry — running gear brand',
   'Maya Park', '@mayapark.runs', 'instagram', 'open',
   'DM said "would love to send you our spring lineup." Asked for rates by Friday.', 0),
  (UUID(), @user, @pu, @su1, 'Podcast guest invite — DTC founders show',
   'Eric Chow', '@dtcfounders', 'linkedin', 'open',
   NULL, 1),
  (UUID(), @user, @pu, @su2, 'Newsletter cross-promo with Indie SaaS Weekly',
   'Lara Singh', '@indiesaasweekly', 'x', 'open',
   '50/50 swap, my list is 8.2k.', 0),
  (UUID(), @user, @pu, @su2, 'Affiliate deal — habit-tracking app',
   'Jordan Lee', '@habitstack', 'threads', 'open',
   '30% recurring, 60-day cookie.', 1),
  (UUID(), @user, @pu, @su3, 'Brand campaign — productivity hardware Q3',
   'Acme Studio', '@acme.studio', 'instagram', 'open',
   'Negotiating exclusivity clause. They want 90 days; I countered 30.', 0),
  (UUID(), @user, @pu, @su4, 'Sponsored thread — design tools roundup',
   'Pixelmint', '@pixelmint', 'x', 'won',
   'Closed at 3 threads / month for Q2.', 0),
  (UUID(), @user, @pu, @su5, 'AI agent SDK paid review',
   'NovaLabs', '@novalabs.ai', 'linkedin', 'lost',
   'Budget pulled. Re-engage in Q4.', 0);
