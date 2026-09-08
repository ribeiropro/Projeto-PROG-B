CREATE TABLE workout_exercises (
    id             SERIAL PRIMARY KEY,
    workout_day_id INTEGER NOT NULL,
    exercise_id    INTEGER NOT NULL,
    sets           INTEGER NOT NULL,
    repetitions    INTEGER NOT NULL,
    rest_seconds   INTEGER NOT NULL DEFAULT 90,
    load_kg        DECIMAL(5,2),
    position       INTEGER NOT NULL,

    FOREIGN KEY (workout_day_id) REFERENCES workout_days(id) ON DELETE CASCADE,
    FOREIGN KEY (exercise_id) REFERENCES exercises(id)
);