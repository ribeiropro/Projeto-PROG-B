CREATE TABLE workout_days (
    id          SERIAL PRIMARY KEY,
    workout_id  INTEGER NOT NULL,
    name        VARCHAR(100) NOT NULL,
    day_of_week VARCHAR(20) NOT NULL,

    FOREIGN KEY (workout_id) REFERENCES workouts(id) ON DELETE CASCADE,
    CHECK (day_of_week IN ('segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'))
);