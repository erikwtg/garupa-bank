import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import routes from "./routes/index.ts"

dotenv.config();;

const app = express()

const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
