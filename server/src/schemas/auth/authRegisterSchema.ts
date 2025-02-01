import { z } from "zod"

export const authRegisterSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string()
})