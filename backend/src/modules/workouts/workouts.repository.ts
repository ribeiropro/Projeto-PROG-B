import { pool } from "../../config/db";
import { Workout } from "./workouts.entity";

// Converte o resultado do banco em um objeto Workout
function toEntity(row: any): Workout {
  return new Workout(
    row.id,
    row.user_id,
    row.title,
    row.is_active,
    row.created_at
  );
}

// Lista os treinos pertencentes a um usuário
export async function findAll(userId: number): Promise<Workout[]> {
  const result = await pool.query(
    `SELECT * FROM workouts
     WHERE user_id = $1
     ORDER BY id`,
    [userId]
  );

  return result.rows.map(toEntity);
}

// Busca um treino pelo ID, respeitando o proprietário
export async function findById(
  id: number,
  userId: number
): Promise<Workout | null> {
  const result = await pool.query(
    `SELECT * FROM workouts
     WHERE id = $1 AND user_id = $2`,
    [id, userId]
  );

  if (result.rows.length === 0) {
    return null;
  }

  return toEntity(result.rows[0]);
}

// Cria um treino
export async function save(
  userId: number,
  title: string,
  isActive: boolean
): Promise<Workout> {
  const result = await pool.query(
    `INSERT INTO workouts (user_id, title, is_active)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [userId, title, isActive]
  );

  return toEntity(result.rows[0]);
}

// Atualiza um treino do usuário
export async function update(
  id: number,
  userId: number,
  title: string,
  isActive: boolean
): Promise<Workout | null> {
  const result = await pool.query(
    `UPDATE workouts
     SET title = $1, is_active = $2
     WHERE id = $3 AND user_id = $4
     RETURNING *`,
    [title, isActive, id, userId]
  );

  if (result.rows.length === 0) {
    return null;
  }

  return toEntity(result.rows[0]);
}

// Exclui um treino do usuário
export async function remove(
  id: number,
  userId: number
): Promise<boolean> {
  const result = await pool.query(
    `DELETE FROM workouts
     WHERE id = $1 AND user_id = $2`,
    [id, userId]
  );

  return (result.rowCount ?? 0) > 0;
}
