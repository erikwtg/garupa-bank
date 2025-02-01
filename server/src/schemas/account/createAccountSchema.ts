import { z } from "zod"

export const createAccountSchema = z.object({
  userId: z.number().optional(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  accountNumber: z.number().optional(),
  agencyNumber: z.number().optional(),
  bankCode: z.number().optional(),
})