import { pool } from "../../config/db";
import { WorkoutExercise } from "./workout_exercises.entity";

// Converte o resultado do banco em um objeto WorkoutExercise
function toEntity(row: any): WorkoutExercise {
  return new WorkoutExercise(
    row.id,
    row.workout_day_id,
    row.exercise_id,
    row.sets,
    row.repetitions,
    row.rest_seconds,
    row.load_kg === null ? null : Number(row.load_kg),
    row.position
  );
}

// Lista os exercícios de um dia de treino
export async function findAll(
  workoutDayId: number,
  userId: number
): Promise<WorkoutExercise[]> {
  const result = await pool.query(
    `SELECT we.*
     FROM workout_exercises we
     JOIN workout_days wd ON wd.id = we.workout_day_id
     JOIN workouts w ON w.id = wd.workout_id
     WHERE we.workout_day_id = $1 AND w.user_id = $2
     ORDER BY we.position`,
    [workoutDayId, userId]
  );

  return result.rows.map(toEntity);
}

// Busca um exercício configurado pelo ID
export async function findById(
  id: number,
  userId: number
): Promise<WorkoutExercise | null> {
  const result = await pool.query(
    `SELECT we.*
     FROM workout_exercises we
     JOIN workout_days wd ON wd.id = we.workout_day_id
     JOIN workouts w ON w.id = wd.workout_id
     WHERE we.id = $1 AND w.user_id = $2`,
    [id, userId]
  );

  if (result.rows.length === 0) return null;

  return toEntity(result.rows[0]);
}

// Adiciona um exercício a um dia de treino
export async function save(
  workoutDayId: number,
  userId: number,
  exerciseId: number,
  sets: number,
  repetitions: number,
  restSeconds: number,
  loadKg: number | null,
  position: number
): Promise<WorkoutExercise | null> {
  const result = await pool.query(
    `INSERT INTO workout_exercises
      (workout_day_id, exercise_id, sets, repetitions, rest_seconds, load_kg, position)
     SELECT wd.id, $3, $4, $5, $6, $7, $8
     FROM workout_days wd
     JOIN workouts w ON w.id = wd.workout_id
     WHERE wd.id = $1 AND w.user_id = $2
     RETURNING *`,
    [
      workoutDayId,
      userId,
      exerciseId,
      sets,
      repetitions,
      restSeconds,
      loadKg,
      position
    ]
  );

  if (result.rows.length === 0) return null;

  return toEntity(result.rows[0]);
}

// Atualiza a configuração de um exercício
export async function update(
  id: number,
  userId: number,
  exerciseId: number,
  sets: number,
  repetitions: number,
  restSeconds: number,
  loadKg: number | null,
  position: number
): Promise<WorkoutExercise | null> {
  const result = await pool.query(
    `UPDATE workout_exercises we
     SET exercise_id = $1,
         sets = $2,
         repetitions = $3,
         rest_seconds = $4,
         load_kg = $5,
         position = $6
     FROM workout_days wd
     JOIN workouts w ON w.id = wd.workout_id
     WHERE we.workout_day_id = wd.id
       AND we.id = $7
       AND w.user_id = $8
     RETURNING we.*`,
    [
      exerciseId,
      sets,
      repetitions,
      restSeconds,
      loadKg,
      position,
      id,
      userId
    ]
  );

  if (result.rows.length === 0) return null;

  return toEntity(result.rows[0]);
}

// Remove um exercício de um dia de treino
export async function remove(
  id: number,
  userId: number
): Promise<boolean> {
  const result = await pool.query(
    `DELETE FROM workout_exercises we
     USING workout_days wd, workouts w
     WHERE we.workout_day_id = wd.id
       AND wd.workout_id = w.id
       AND we.id = $1
       AND w.user_id = $2`,
    [id, userId]
  );

  return (result.rowCount ?? 0) > 0;
}