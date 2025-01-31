import { drizzle } from 'drizzle-orm/node-postgres'
import dotenv from "dotenv"

import pkg from 'pg'
const { Pool } = pkg

dotenv.config()

const pool = new Pool({
  connectionString: `${process.env.DB_HOST}://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
});

export const db = drizzle({ client: pool })
