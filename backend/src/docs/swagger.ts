import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ORBE API",
      version: "1.0.0",
      description:
        "Documentação da API do ORBE, sistema de gerenciamento de treinos e hidratação.",
    },
    servers: [
      {
        url: "/",
        description: "Servidor atual",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    tags: [
      {
        name: "Usuários",
        description: "Cadastro de usuários",
      },
      {
        name: "Autenticação",
        description: "Login e geração de token JWT",
      },
      {
        name: "Treinos",
        description: "Gerenciamento dos treinos do usuário",
      },
    ],
  },
  apis: ["./src/modules/**/*.routes.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
