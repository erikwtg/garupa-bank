import { BaseRepository } from './base/BaseRepository.ts'
import { UserEntity } from '../entities/UserEntity.ts'
import { users } from "../database/schema.ts"
import { db } from "../database/config.ts"
import { eq } from "drizzle-orm"

export class UserRepository extends BaseRepository<UserEntity> {
  constructor() {
    super(users)
  }

  async findByEmail(email: string): Promise<UserEntity[]> {
    try {
      return await db.select().from(users).where(eq(users.email, email)).limit(1)
    } catch(error) {
      console.log(`Usuário com email ${email} não encontrado.: `, error)
      throw new Error(`Usuário com email ${email} não encontrado..`)
    }
  }
} 