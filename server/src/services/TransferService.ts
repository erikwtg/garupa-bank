import { TransferEntity } from '../entities/TransferEntity.ts'
import { BaseService } from './base/BaseService.ts'
import { TransferRepository } from '../repositories/TransferRepository.ts'

export class TransferService extends BaseService<TransferEntity> {
  private transferRepository: TransferRepository

  constructor() {
    super(new TransferRepository())
    this.transferRepository = new TransferRepository()
  }

  async findTransferByAccountId(accountId: number) {
    return this.transferRepository.findAccountsByAccountId(accountId)
  }
}