import { pgTable, serial, text, numeric, timestamp } from "drizzle-orm/pg-core"

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  externalId: text("external_id").notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  expectedOn: timestamp('expected_on'),
  status: text('status').notNull(),
  transactionType: text("transaction_type").notNull(), // "TRANSFER", "PAYMENT", "DEPOSIT", "WITHDRAWAL"
  transferMethod: text("transfer_method"), // "TED", "DOC", "PIX"
  accountHolder: text("account_holder"),  
  accountNumber: text("account_number"),  
  agencyNumber: text("agency_number"),  
  bankCode: text("bank_code"),
  beneficiaryAccountHolder: text("beneficiary_account_holder"),  
  beneficiaryAccountNumber: text("beneficiary_account_number"),  
  beneficiaryAgencyNumber: text("beneficiary_agency_number"),  
  beneficiaryBankCode: text("beneficiary_bank_code"),
  transactionDescription: text("transaction_description"),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})