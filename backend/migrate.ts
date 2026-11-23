import "dotenv/config";
import { Client } from "pg";
import fs from "fs";
import path from "path";

async function migrate() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();

    const migrationsDir = path.join(__dirname, "migrations");

    const files = fs
      .readdirSync(migrationsDir)
      .filter((file) => file.endsWith(".sql"))
      .sort();

    // Cria a tabela de controle das migrações
    await client.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        filename VARCHAR(255) PRIMARY KEY,
        executed_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);

    // Migrações que já existem no banco atual
    const previousMigrations = [
      "001_create_users.sql",
      "002_create_workouts.sql",
      "003_create_workout_days.sql",
      "004_create_exercises.sql",
      "005_create_workout_exercises.sql",
      "006_create_hydration.sql",
      "007_create_workout_sessions.sql",
      "008_create_session_sets.sql",
    ];

    // Verifica se o banco já possui todas as tabelas antigas
    const tables = [
      "users",
      "workouts",
      "workout_days",
      "exercises",
      "workout_exercises",
      "hydration",
      "workout_sessions",
      "session_sets",
    ];

    const result = await client.query(
      `SELECT COUNT(*)::int AS total
       FROM information_schema.tables
       WHERE table_schema = 'public'
       AND table_name = ANY($1::text[])`,
      [tables]
    );

    const existingTables = result.rows[0].total;

    // Reconhece um banco que já recebeu as migrações antigas
    if (existingTables === tables.length) {
      for (const file of previousMigrations) {
        if (!files.includes(file)) {
          throw new Error(`Migração antiga não encontrada: ${file}`);
        }
      }

      await client.query(
        `INSERT INTO schema_migrations (filename)
         SELECT unnest($1::text[])
         ON CONFLICT (filename) DO NOTHING`,
        [previousMigrations]
      );

      console.log("Migrações antigas reconhecidas.");
    } else if (existingTables > 0) {
      throw new Error(
        "Banco parcialmente migrado. Verifique as tabelas antes de continuar."
      );
    }

    // Executa somente as migrações ainda não aplicadas
    for (const file of files) {
      const check = await client.query(
        `SELECT 1 FROM schema_migrations
         WHERE filename = $1`,
        [file]
      );

      if (check.rows.length > 0) {
        console.log(`Já executada: ${file}`);
        continue;
      }

      const sql = fs.readFileSync(
        path.join(migrationsDir, file),
        "utf8"
      );

      console.log(`Executando: ${file}`);

      try {
        await client.query("BEGIN");

        await client.query(sql);

        await client.query(
          `INSERT INTO schema_migrations (filename)
           VALUES ($1)`,
          [file]
        );

        await client.query("COMMIT");

        console.log(`Concluída: ${file}`);
      } catch (error) {
        await client.query("ROLLBACK");
        throw error;
      }
    }

    console.log("Migrations concluídas.");
  } finally {
    await client.end();
  }
}

migrate().catch((err) => {
  console.error("Erro ao executar migrations:", err.message);
  process.exitCode = 1;
});
