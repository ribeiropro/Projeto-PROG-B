import bcrypt from "bcrypt";

import { CreateUserDTO } from "./users.entity";
import * as usersRepository from "./users.repository";
import { AppError } from "../../errors/AppError";

// Cadastra um novo usuário
export async function register(data: CreateUserDTO) {
  const { name, email, password, weight_kg, height_cm } = data;

  // Verifica os campos obrigatórios
  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof email !== "string" ||
    !email.trim() ||
    typeof password !== "string" ||
    !password ||
    typeof weight_kg !== "number" ||
    !Number.isFinite(weight_kg) ||
    typeof height_cm !== "number" ||
    !Number.isFinite(height_cm)
  ) {
    throw new AppError(
      "Preencha todos os campos corretamente.",
      400,
      "INVALID_DATA"
    );
  }

  if (weight_kg <= 0 || height_cm <= 0) {
    throw new AppError(
      "Peso e altura devem ser maiores que zero.",
      400,
      "INVALID_DATA"
    );
  }

  // Normaliza o e-mail
  const normalizedEmail = email.trim().toLowerCase();

  // Verifica se o e-mail já está cadastrado
  const existingUser = await usersRepository.findByEmail(
    normalizedEmail
  );

  if (existingUser) {
    throw new AppError(
      "Este e-mail já está cadastrado.",
      409,
      "EMAIL_ALREADY_EXISTS"
    );
  }

  // Protege a senha antes de salvar
  const passwordHash = await bcrypt.hash(password, 10);

  // Salva o usuário no banco
  const user = await usersRepository.save(
    name.trim(),
    normalizedEmail,
    passwordHash,
    weight_kg,
    height_cm
  );

  // Retorna apenas os dados públicos do usuário
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    weight_kg: user.weight_kg,
    height_cm: user.height_cm,
    created_at: user.created_at,
  };
}
