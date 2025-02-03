import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import routes from "./routes/index.ts"

import { setupSwagger } from "./config/swagger.ts";

dotenv.config()

const app = express()

setupSwagger(app);

const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  console.log("Documentação disponível em http://localhost:3000/api-docs");
  console.log("Swagger JSON em http://localhost:3000/swagger.json");
})
