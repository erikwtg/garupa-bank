import { AccountRepository } from '../repositories/AccountRepository.ts'
import { AccountService } from '../services/AccountService.ts'

export class AccountFactory {
  static getInstance() {
    const accountRepository = new AccountRepository()
    const accountService = new AccountService(accountRepository)
    return accountService
  }
}