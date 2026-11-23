import { pool } from "../../config/db";
import { Exercise } from "./exercises.entity";

// Converte o resultado do banco em um objeto Exercise
function toEntity(row: any): Exercise {
  return new Exercise(
    row.id,
    row.name,
    row.muscle_group,
    row.user_id
  );
}

// Lista todos os exercícios disponíveis
export async function findAll(): Promise<Exercise[]> {
  const result = await pool.query(
    `SELECT * FROM exercises
     ORDER BY id`
  );

  return result.rows.map(toEntity);
}

// Busca um exercício pelo ID
export async function findById(
  id: number
): Promise<Exercise | null> {
  const result = await pool.query(
    `SELECT * FROM exercises
     WHERE id = $1`,
    [id]
  );

  if (result.rows.length === 0) {
    return null;
  }

  return toEntity(result.rows[0]);
}

// Cria um exercício personalizado
export async function save(
  userId: number,
  name: string,
  muscleGroup: string
): Promise<Exercise> {
  const result = await pool.query(
    `INSERT INTO exercises (user_id, name, muscle_group)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [userId, name, muscleGroup]
  );

  return toEntity(result.rows[0]);
}

// Atualiza somente exercícios criados pelo próprio usuário
export async function update(
  id: number,
  userId: number,
  name: string,
  muscleGroup: string
): Promise<Exercise | null> {
  const result = await pool.query(
    `UPDATE exercises
     SET name = $1, muscle_group = $2
     WHERE id = $3 AND user_id = $4
     RETURNING *`,
    [name, muscleGroup, id, userId]
  );

  if (result.rows.length === 0) {
    return null;
  }

  return toEntity(result.rows[0]);
}

// Verifica se o exercício está sendo utilizado em algum treino
export async function isUsed(id: number): Promise<boolean> {
  const result = await pool.query(
    `SELECT EXISTS (
       SELECT 1
       FROM workout_exercises
       WHERE exercise_id = $1
     ) AS used`,
    [id]
  );

  return result.rows[0].used;
}

// Exclui somente exercícios criados pelo próprio usuário
export async function remove(
  id: number,
  userId: number
): Promise<boolean> {
  const result = await pool.query(
    `DELETE FROM exercises
     WHERE id = $1 AND user_id = $2`,
    [id, userId]
  );

  return (result.rowCount ?? 0) > 0;
}
