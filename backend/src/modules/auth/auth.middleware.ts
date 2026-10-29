import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { AppError } from "../../errors/AppError";

// Verifica se o usuário está autenticado
export function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers.authorization;

  // Verifica se o token foi enviado
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(
      new AppError(
        "Token de autenticação não informado.",
        401,
        "UNAUTHORIZED"
      )
    );
  }

  const token = authorization.slice(7).trim();

  if (!token) {
    return next(
      new AppError(
        "Token de autenticação não informado.",
        401,
        "UNAUTHORIZED"
      )
    );
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    return next(new Error("JWT_SECRET não configurado."));
  }

  try {
    // Verifica se o token é válido
    const decoded = jwt.verify(token, jwtSecret);

    if (
      typeof decoded === "string" ||
      typeof (decoded as JwtPayload).id !== "number"
    ) {
      throw new AppError(
        "Token de autenticação inválido.",
        401,
        "INVALID_TOKEN"
      );
    }

    // Guarda o ID do usuário autenticado para as próximas etapas
    res.locals.userId = (decoded as JwtPayload).id;

    next();
  } catch (error) {
    next(
      new AppError(
        "Token inválido ou expirado.",
        401,
        "INVALID_TOKEN"
      )
    );
  }
}
