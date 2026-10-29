import { pool } from "../../config/db";
import { User } from "./users.entity";

// Busca um usuário pelo e-mail
export async function findByEmail(
  email: string
): Promise<User | null> {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  const row = result.rows[0];

  if (!row) {
    return null;
  }

  return toEntity(row);
}

// Cadastra um novo usuário
export async function save(
  name: string,
  email: string,
  passwordHash: string,
  weightKg: number,
  heightCm: number
): Promise<User> {
  const result = await pool.query(
    `INSERT INTO users
      (name, email, password, weight_kg, height_cm)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [name, email, passwordHash, weightKg, heightCm]
  );

  return toEntity(result.rows[0]);
}

// Converte os dados do banco em um objeto User
function toEntity(row: any): User {
  return new User(
    row.id,
    row.name,
    row.email,
    row.password,
    Number(row.weight_kg),
    row.height_cm,
    row.profile_image,
    row.created_at
  );
}
