import { BaseRepository } from './base/BaseRepository.ts'
import { TransferEntity } from '../entities/TransferEntity.ts'
import { accounts, transactions } from "../database/schema.ts"
import { db } from '../database/config.ts'
import { eq } from 'drizzle-orm'

export class TransferRepository extends BaseRepository<TransferEntity> {
  constructor() {
    super(transactions)
  }

  async findAccountsByAccountId(accountId: number) {
    try {
      const userAccounts = await db.select({
        id: transactions.id,
        orderId: transactions.orderId,
        externalId: transactions.externalId,
        accountId: transactions.accountId,
        amount: transactions.amount,
        expectedOn: transactions.expectedOn,
        dueDate: transactions.dueDate,
        status: transactions.status,
        transactionType: transactions.transactionType,
        transferMethod: transactions.transferMethod,
        beneficiaryAccountHolder: transactions.beneficiaryAccountHolder,
        beneficiaryAccountNumber: transactions.beneficiaryAccountNumber,
        beneficiaryAgencyNumber: transactions.beneficiaryAgencyNumber,
        beneficiaryBankCode: transactions.beneficiaryBankCode,
        transactionDescription: transactions.transactionDescription,
        createdAt: transactions.createdAt,
        updatedAt: transactions.updatedAt,
      }).from(transactions).where(eq(transactions.accountId, accountId))

      return userAccounts
    } catch (error) {
      throw new Error('Error ao encontrar transferências por conta')
    }
  }
}