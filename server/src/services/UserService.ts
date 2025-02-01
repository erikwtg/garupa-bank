import { UserEntity } from '../entities/UserEntity.ts'
import { UserRepository } from '../repositories/UserRepository.ts'
import { BaseService } from './base/BaseService.ts'

export class UserService extends BaseService<UserEntity> {
  private userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    super(userRepository)
    this.userRepository = userRepository
  }

  async findByEmail(email: string): Promise<UserEntity[]> {
    return this.userRepository.findByEmail(email)
  }
}