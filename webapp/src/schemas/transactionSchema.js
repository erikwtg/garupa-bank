import { z } from 'zod'

export const createTransactionSchema = z.object({
  externalId: z.string().min(1).optional().nullable(),
  amount: z.number().min(0).optional(),
  beneficiaryAccountHolder: z.string().min(1),
  beneficiaryAccountNumber: z.number().min(1),
  beneficiaryAgencyNumber: z.number().min(1),
  beneficiaryBankCode: z.number().min(1),
  transactionType: z.string().min(1).optional().default('TRANSFER').nullable(),
  transferMethod: z.string().min(1).optional().default('TED').nullable(),
  transactionDescription: z.string().min(1).optional().nullable(),
  expectedOn: z.preprocess(
    (val) => {
      if (typeof val === "string" || val instanceof Date) {
        const date = new Date(val);
        return isNaN(date.getTime()) ? undefined : date
      }
      return undefined
    },
    z.date().optional()
  ).transform(val => val instanceof Date ? val : new Date(val)),
  dueDate: z.preprocess(
    (val) => {
      if (typeof val === "string" || val instanceof Date) {
        const date = new Date(val);
        return isNaN(date.getTime()) ? undefined : date
      }
      return undefined
    },
    z.date().optional()
  ).transform(val => val instanceof Date ? val : new Date(val)),
})