import { pgTable, serial, text, numeric, integer, timestamp, uuid, foreignKey } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const accounts = pgTable("accounts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  accountNumber: integer("account_number").notNull().unique(),
  agencyNumber: integer("agency_number").notNull().unique(),
  bankCode: integer("bank_code").notNull().unique(),
  balance: numeric("balance", { precision: 10, scale: 2 }).default(10000),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  orderId: uuid("order_id").defaultRandom().notNull(),
  externalId: text("external_id"),
  accountId: integer("account_id").notNull().references(() => accounts.id),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  expectedOn: timestamp('expected_on'),
  dueDate: timestamp('due_date'),
  status: text('status').notNull(),
  transactionType: text("transaction_type").notNull(), // "TRANSFER", "PAYMENT", "DEPOSIT", "WITHDRAWAL"
  transferMethod: text("transfer_method"), // "TED", "DOC", "PIX"
  beneficiaryAccountHolder: integer("beneficiary_account_holder"), 
  beneficiaryAccountNumber: integer("beneficiary_account_number"), 
  beneficiaryAgencyNumber: integer("beneficiary_agency_number"),
  beneficiaryBankCode: integer("beneficiary_bank_code"),
  transactionDescription: text("transaction_description"),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})
