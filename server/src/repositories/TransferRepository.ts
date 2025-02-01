import { BaseRepository } from './base/BaseRepository.ts'
import { TransferEntity } from '../entities/TransferEntity.ts'
import { transactions } from "../database/schema.ts"

export class TransferRepository extends BaseRepository<TransferEntity> {
  constructor() {
    super(transactions)
  }
}