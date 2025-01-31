import { z } from "zod"

export const createTransferSchema = z.object({
  externalId: z.string().min(1, "externalId é obrigatório"),
  amount: z.number().positive("amount deve ser um número positivo"),
  expectedOn: z.string().datetime().optional().transform((val) => val ? new Date(val) : undefined),
  status: z.string().optional(),
  transactionType: z.string().min(1, "transactionType é obrigatório"),
  transferMethod: z.string().min(1, "transferMethod é obrigatório"),
  accountHolder: z.string().optional(),
  accountNumber: z.string().optional(),
  agencyNumber: z.string().optional(),
  bankCode: z.string().optional(),
  beneficiaryAccountHolder: z.string().optional(),
  beneficiaryAccountNumber: z.string().optional(),
  beneficiaryAgencyNumber: z.string().optional(),
  beneficiaryBankCode: z.string().optional(),
  transactionDescription: z.string().optional(),
});