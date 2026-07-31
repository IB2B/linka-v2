-- Reddit and YouTube cannot publish without a title, and until now nothing
-- generated or stored one. 300 chars is Reddit's own limit, the longest of any
-- platform we post to.
ALTER TABLE generated_content
  ADD COLUMN title VARCHAR(300) NULL AFTER prompt;
