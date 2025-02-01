import { z } from "zod"

export const getAccountSchema = z.object({
  id: z.string().regex(/^\d+$/, "ID deve ser um número válido").transform(Number)
})