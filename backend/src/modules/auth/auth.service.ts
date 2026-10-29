import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import * as usersRepository from "../users/users.repository";
import { AppError } from "../../errors/AppError";

interface LoginDTO {
  email: string;
  password: string;
}

export async function login(data: LoginDTO) {
  const { email, password } = data ?? {};

  // Verifica os dados recebidos
  if (
    typeof email !== "string" ||
    !email.trim() ||
    typeof password !== "string" ||
    !password
  ) {
    throw new AppError(
      "Informe o e-mail e a senha.",
      400,
      "INVALID_DATA"
    );
  }

  // Procura o usuário no banco
  const user = await usersRepository.findByEmail(
    email.trim().toLowerCase()
  );

  if (!user) {
    throw new AppError(
      "E-mail ou senha incorretos.",
      401,
      "INVALID_CREDENTIALS"
    );
  }

  // Compara a senha enviada com o hash armazenado
  const validPassword = await bcrypt.compare(
    password,
    user.password
  );

  if (!validPassword) {
    throw new AppError(
      "E-mail ou senha incorretos.",
      401,
      "INVALID_CREDENTIALS"
    );
  }

  // Obtém a chave secreta do ambiente
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("JWT_SECRET não configurado.");
  }

  // Gera o token de autenticação
  const token = jwt.sign(
    { id: user.id },
    jwtSecret,
    { expiresIn: "1h" }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
}
