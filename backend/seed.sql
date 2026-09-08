-- Limpar dados existentes (para poder rodar o seed repetidamente)
TRUNCATE users, workouts, workout_days, exercises, workout_exercises,
         workout_sessions, session_sets, hydration
    RESTART IDENTITY CASCADE;

-- Usuários
INSERT INTO users (name, email, password, weight_kg, height_cm) VALUES
    ('Joao Ribeiro', 'ribeiro@email.com', '12345', 73, 181),
    ('Bruno Costa', 'bruno@email.com', 'senhasenha', 82.0, 178);

-- Ficha de treino de Ribeiro (id = 1)
INSERT INTO workouts (user_id, title, is_active) VALUES
    (1, 'Treino ABC', true);

-- Dias do Treino ABC
INSERT INTO workout_days (workout_id, name, day_of_week) VALUES
    (1, 'Peito, Ombro e Tríceps', 'segunda'),
    (1, 'Costas e Bíceps',        'quarta'),
    (1, 'Pernas',                 'sexta');

-- Catálogo de exercícios
INSERT INTO exercises (name, muscle_group) VALUES
    ('Supino Reto',    'Peito'),
    ('Crucifixo',      'Peito'),
    ('Tríceps Corda',  'Tríceps'),
    ('Puxada',         'Costas'),
    ('Rosca Direta',   'Bíceps'),
    ('Agachamento',    'Pernas'),
    ('Leg Press',      'Pernas');

-- Exercícios de Segunda (workout_day_id = 1)
INSERT INTO workout_exercises (workout_day_id, exercise_id, sets, repetitions, rest_seconds, load_kg, position) VALUES
    (1, 1, 3, 10, 90, 20.0, 1),  -- Supino Reto
    (1, 2, 3, 12, 60, 14.0, 2),  -- Crucifixo
    (1, 3, 3, 12, 45, 15.0, 3);  -- Tríceps Corda

-- Exercícios de Quarta (workout_day_id = 2)
INSERT INTO workout_exercises (workout_day_id, exercise_id, sets, repetitions, rest_seconds, load_kg, position) VALUES
    (2, 4, 4, 10, 90, 40.0, 1),  -- Puxada
    (2, 5, 3, 12, 60, 12.0, 2);  -- Rosca Direta

-- Exercícios de Sexta (workout_day_id = 3)
INSERT INTO workout_exercises (workout_day_id, exercise_id, sets, repetitions, rest_seconds, load_kg, position) VALUES
    (3, 6, 4, 10, 120, 60.0, 1), -- Agachamento
    (3, 7, 3, 12, 90, 80.0, 2);  -- Leg Press

-- Uma sessão já concluída de Segunda (workout_day_id = 1), pra já ter histórico pra consultar
INSERT INTO workout_sessions (workout_day_id, started_at, finished_at) VALUES
    (1, '2026-09-01 07:00', '2026-09-01 07:55');

-- Séries realmente feitas nessa sessão, no Supino Reto (workout_exercise_id = 1)
INSERT INTO session_sets (session_id, workout_exercise_id, set_number, reps_done, loads_used) VALUES
    (1, 1, 1, 10, 20.0),
    (1, 1, 2, 10, 22.0),
    (1, 1, 3, 8, 22.0);

-- Hidratação de Ribeiro hoje
INSERT INTO hydration (user_id, date, amount_ml, consumed_at) VALUES
    (1, CURRENT_DATE, 500, NOW()),
    (1, CURRENT_DATE, 300, NOW());