CREATE TABLE workout_sessions (
    id              SERIAL PRIMARY KEY,
    workout_day_id  INTEGER NOT NULL,
    started_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    finished_at     TIMESTAMP,

    FOREIGN KEY (workout_day_id) REFERENCES workout_days(id) ON DELETE CASCADE
);