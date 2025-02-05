import { BaseRepository } from './base/BaseRepository.ts'
import { AccountEntity } from '../entities/AccountEntity.ts'
import { accounts } from "../database/schema.ts"
import { db } from '../database/config.ts'
import { eq } from 'drizzle-orm'

export class AccountRepository extends BaseRepository<AccountEntity> {
  constructor() {
    super(accounts)
  }

  async findAccountsByUserId(userId: number) {
    try {
      const userAccounts = await db.select({
        id: accounts.id,
        accountNumber: accounts.accountNumber,
        agencyNumber: accounts.agencyNumber,
        bankCode: accounts.bankCode,
        balance: accounts.balance,
        createdAt: accounts.createdAt,
        updatedAt: accounts.updatedAt,
      }).from(accounts).where(eq(accounts.userId, userId))

      return userAccounts
    } catch (error) {
      throw new Error('Error finding accounts by user id')
    }
  }
}