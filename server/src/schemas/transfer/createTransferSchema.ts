import { z } from "zod"

export const createTransferSchema = z.object({
  externalId: z.string().optional(),
  orderId: z.string().optional(),
  accountId: z.number(),
  amount: z.number().positive("amount deve ser um número positivo"),
  expectedOn: z.string().datetime().optional().transform((val) => val ? new Date(val) : undefined),
  dueDate: z.string().datetime().optional().transform((val) => val ? new Date(val) : undefined),
  status: z.string().optional(),
  transactionType: z.string().min(1, "transactionType é obrigatório"),
  transferMethod: z.string().min(1, "transferMethod é obrigatório"),
  accountHolder: z.string().optional(),
  accountNumber: z.string().optional(),
  agencyNumber: z.string().optional(),
  bankCode: z.string().optional(),
  beneficiaryAccountHolder: z.number().optional(),
  beneficiaryAccountNumber: z.number().optional(),
  beneficiaryAgencyNumber: z.number().optional(),
  beneficiaryBankCode: z.number().optional(),
  transactionDescription: z.string().optional(),
})