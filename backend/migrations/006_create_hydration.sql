CREATE TABLE hydration (
    id          SERIAL PRIMARY KEY,
    user_id     INTEGER NOT NULL,
    date        DATE NOT NULL,
    amount_ml   INTEGER NOT NULL,
    consumed_at TIMESTAMP DEFAULT NOW(),

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);