import { BaseRepository } from './base/BaseRepository.ts'
import { AccountEntity } from '../entities/AccountEntity.ts'
import { accounts } from "../database/schema.ts"

export class AccountRepository extends BaseRepository<AccountEntity> {
  constructor() {
    super(accounts)
  }
}