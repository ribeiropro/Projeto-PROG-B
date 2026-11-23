ALTER TABLE exercises
ADD COLUMN user_id INTEGER
REFERENCES users(id) ON DELETE RESTRICT;

ALTER TABLE exercises
DROP CONSTRAINT exercises_name_key;

CREATE UNIQUE INDEX exercises_default_name_unique
ON exercises (LOWER(name))
WHERE user_id IS NULL;

CREATE UNIQUE INDEX exercises_user_name_unique
ON exercises (user_id, LOWER(name))
WHERE user_id IS NOT NULL;

ALTER TABLE exercises
ALTER COLUMN muscle_group SET NOT NULL;