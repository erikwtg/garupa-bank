import { type AuthServiceDTO } from './AuthServiceDTO.ts'
import { type IAuthService } from './IAuthService.ts'

import { AccountEntity } from "../../entities/AccountEntity.ts"
import { AccountFactory } from "../../factories/AccountFactory.ts"
import { UserEntity } from '../../entities/UserEntity.ts'
import { UserFactory } from '../../factories/UserFactory.ts'

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

// Todo[Erik] - Mover para utils
function generateRandomNumber(digits: number): string {
  const min = Math.pow(10, digits - 1)  // O menor número com 'digits' dígitos
  const max = Math.pow(10, digits) - 1  // O maior número com 'digits' dígitos
  const randomNum = Math.floor(Math.random() * (max - min + 1)) + min
  return randomNum.toString()
}

export class AuthService implements IAuthService<AuthServiceDTO> {
  async register(data: AuthServiceDTO): Promise<{ userId: number | undefined }> {
    const hashedPassword = await bcrypt.hash(data.password, 10)
    Object.assign(data, { password: hashedPassword})

    let newUser = new UserEntity(data)
    const userService = UserFactory.getInstance()
    const createdUser = await userService.create(newUser)

    if (!createdUser) {
      throw new Error("Erro ao criar usuário")
    }

    const accountData = {
      userId: createdUser[0].id,
      accountNumber: generateRandomNumber(6),
      agencyNumber: generateRandomNumber(4),
      bankCode: generateRandomNumber(3)
    }

    // Todo[Erik] - Verificar tipagem userId incompatível
    let newAccount = new AccountEntity(accountData)
    const accountService = AccountFactory.getInstance()
    const createdAccount = await accountService.create(newAccount)

    if (!createdAccount) {
      throw new Error("Erro ao criar conta")
    }

    return { userId: createdUser[0].id }
  }

  async login(email: string, password: string): Promise<{ token: string, userId: number | undefined}> {
    const userService = UserFactory.getInstance()
    const user = await userService.findByEmail(email)
    
    if (user.length === 0) {
      throw new Error("Usuário não encontrado")
    }

    const isPasswordValid = await bcrypt.compare(password, user[0].password)
    if (!isPasswordValid) {
      throw new Error("Senha incorreta")
    }

    const token = jwt.sign({ userId: user[0].id, email: user[0].email}, "garupa-key", { expiresIn: "1h" })

    return { token, userId: user[0].id }
  }
}