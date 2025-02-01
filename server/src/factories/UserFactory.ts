import { UserRepository } from '../repositories/UserRepository.ts'
import { UserService } from '../services/UserService.ts'

export class UserFactory {
  static getInstance() {
    const userRepository = new UserRepository()
    const userService = new UserService(userRepository)
    return userService
  }
}