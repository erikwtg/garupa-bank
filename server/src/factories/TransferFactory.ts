import { TransferRepository } from '../repositories/TransferRepository.ts';
import { TransferService } from '../services/TransferService.ts';

export class TransferFactory {
  static getInstance() {
    const transferRepository = new TransferRepository();
    const transferService = new TransferService(transferRepository);
    return transferService;
  }
}