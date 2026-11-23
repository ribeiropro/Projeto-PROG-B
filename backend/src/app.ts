import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import usersRoutes from "./modules/users/users.routes";
import authRoutes from "./modules/auth/auth.routes";
import workoutsRoutes from "./modules/workouts/workouts.routes";
import { AppError } from "./errors/AppError";
import { errorHandler } from "./errors/errorHandler";
import exercisesRoutes from "./modules/exercises/exercises.routes";
import workoutDaysRoutes from "./modules/workout_days/workout_days.routes";
import workoutExercisesRoutes from "./modules/workout_exercises/workout_exercises.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rota de teste
app.get("/", (req, res) => {
  res.json({ message: "API ORBE funcionando!" });
});

// Cadastro de usuários
app.use("/api/users", usersRoutes);

// Login
app.use("/api/users", authRoutes);

// CRUD de treinos
app.use("/api/workouts", workoutsRoutes);

// CRUD de dias de treino
app.use("/api", workoutDaysRoutes);

// CRUD de exercicios
app.use("/api/exercises", exercisesRoutes);

// CRUD de configurações dos exercicios
app.use("/api", workoutExercisesRoutes);

// Rotas inexistentes
app.use((req: Request, res: Response, next: NextFunction) => {
  next(
    new AppError(
      "A rota solicitada não existe.",
      404,
      "ROUTE_NOT_FOUND"
    )
  );
});

// Tratamento centralizado de erros
app.use(errorHandler);

export default app;
