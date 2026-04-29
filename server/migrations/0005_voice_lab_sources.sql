ALTER TABLE writing_samples
  MODIFY COLUMN source ENUM(
    'linkedin','twitter','facebook','instagram','threads',
    'newsletter','blog','article','email','other'
  ) NOT NULL DEFAULT 'other';
