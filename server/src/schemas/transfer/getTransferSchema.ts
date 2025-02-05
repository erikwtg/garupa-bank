import { z } from "zod"

export const getTransferSchema = z.object({
  id: z.string().regex(/^\d+$/, "ID deve ser um número válido").transform(Number)
})

export const getTransferByAccountIdSchema = z.object({
  accountId: z.string().regex(/^\d+$/, "ID deve ser um número válido").transform(Number)
})