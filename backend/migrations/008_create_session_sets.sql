CREATE TABLE session_sets (
    id                    SERIAL PRIMARY KEY,
    session_id            INTEGER NOT NULL,
    workout_exercise_id   INTEGER NOT NULL,
    set_number            INTEGER NOT NULL,
    reps_done             INTEGER NOT NULL,
    loads_used            DECIMAL(5,2),
    completed_at          TIMESTAMP NOT NULL DEFAULT NOW(),

    FOREIGN KEY (session_id) REFERENCES workout_sessions(id) ON DELETE CASCADE,
    FOREIGN KEY (workout_exercise_id) REFERENCES workout_exercises(id) ON DELETE CASCADE
);