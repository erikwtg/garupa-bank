import { AccountEntity } from '../entities/AccountEntity.ts'
import { BaseService } from './base/BaseService.ts'
import { AccountRepository } from '../repositories/AccountRepository.ts'

export class AccountService extends BaseService<AccountEntity> {
  private accountRepository: AccountRepository

  constructor() {
    super(new AccountRepository())
    this.accountRepository = new AccountRepository()
  }

  async findAccountsByUserId(userId: number) {
    return this.accountRepository.findAccountsByUserId(userId)
  }
}