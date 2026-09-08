CREATE TABLE workouts (
    id          SERIAL PRIMARY KEY,
    user_id     INTEGER NOT NULL,
    title       VARCHAR(200) NOT NULL,
    is_active   BOOLEAN NOT NULL DEFAULT true,
    created_at  TIMESTAMP NOT NULL DEFAULT NOW(),

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
