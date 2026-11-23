import { pool } from "../../config/db";
import { WorkoutDay } from "./workout_days.entity";

// Converte o resultado do banco em um objeto WorkoutDay
function toEntity(row: any): WorkoutDay {
  return new WorkoutDay(
    row.id,
    row.workout_id,
    row.name,
    row.day_of_week
  );
}

// Lista os dias de um treino pertencente ao usuário
export async function findAll(
  workoutId: number,
  userId: number
): Promise<WorkoutDay[]> {
  const result = await pool.query(
    `SELECT wd.*
     FROM workout_days wd
     JOIN workouts w ON w.id = wd.workout_id
     WHERE wd.workout_id = $1 AND w.user_id = $2
     ORDER BY wd.id`,
    [workoutId, userId]
  );

  return result.rows.map(toEntity);
}

// Busca um dia pelo ID, respeitando o proprietário do treino
export async function findById(
  id: number,
  userId: number
): Promise<WorkoutDay | null> {
  const result = await pool.query(
    `SELECT wd.*
     FROM workout_days wd
     JOIN workouts w ON w.id = wd.workout_id
     WHERE wd.id = $1 AND w.user_id = $2`,
    [id, userId]
  );

  if (result.rows.length === 0) {
    return null;
  }

  return toEntity(result.rows[0]);
}

// Cria um dia dentro de um treino pertencente ao usuário
export async function save(
  workoutId: number,
  userId: number,
  name: string,
  dayOfWeek: string
): Promise<WorkoutDay | null> {
  const result = await pool.query(
    `INSERT INTO workout_days (workout_id, name, day_of_week)
     SELECT id, $3, $4
     FROM workouts
     WHERE id = $1 AND user_id = $2
     RETURNING *`,
    [workoutId, userId, name, dayOfWeek]
  );

  if (result.rows.length === 0) {
    return null;
  }

  return toEntity(result.rows[0]);
}

// Atualiza um dia de um treino pertencente ao usuário
export async function update(
  id: number,
  userId: number,
  name: string,
  dayOfWeek: string
): Promise<WorkoutDay | null> {
  const result = await pool.query(
    `UPDATE workout_days wd
     SET name = $1, day_of_week = $2
     FROM workouts w
     WHERE wd.id = $3
       AND wd.workout_id = w.id
       AND w.user_id = $4
     RETURNING wd.*`,
    [name, dayOfWeek, id, userId]
  );

  if (result.rows.length === 0) {
    return null;
  }

  return toEntity(result.rows[0]);
}

// Exclui um dia de um treino pertencente ao usuário
export async function remove(
  id: number,
  userId: number
): Promise<boolean> {
  const result = await pool.query(
    `DELETE FROM workout_days wd
     USING workouts w
     WHERE wd.id = $1
       AND wd.workout_id = w.id
       AND w.user_id = $2`,
    [id, userId]
  );

  return (result.rowCount ?? 0) > 0;
}
