import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { type Express } from "express";
import { transferDocs } from "../config/swaggerDocs.ts";

const options: swaggerJsDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Garupa Bank API",
      version: "1.0.0",
      description: "Documentação da API gerada automaticamente pelo Swagger",
    },
    paths: {
      ...transferDocs,
    },
    tags: [
      { name: "Auth", description: "Operações relacionadas à autenticação de usuários" },
      { name: "Account", description: "Operações relacionadas à contas do usuário" },
      { name: "Transactions", description: "Operações relacionadas às transações financeiras" }
    ]
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsDoc(options);

export function setupSwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/swagger.json", (req, res) => res.json(swaggerSpec));
}